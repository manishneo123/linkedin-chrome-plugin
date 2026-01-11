chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'PING') {
        sendResponse({ success: true, message: 'PONG' });
        return true;
    }

    if (request.action === 'SCRAPE_PROFILE') {
        console.log('[ContentScript] 🚀 Starting enhanced profile extraction...');

        try {
            // Extract main profile text
            const mainContent = document.querySelector('main') || document.querySelector('.scaffold-layout__main') || document.body;
            let profileText = mainContent.innerText || '';
            profileText = profileText.replace(/\s+/g, ' ').trim().substring(0, 40000);

            console.log('[ContentScript] ✓ Profile text extracted:', profileText.length, 'chars');

            // Extract recent activity (posts, likes, comments)
            const activity = extractRecentActivity();
            console.log('[ContentScript] ✓ Activity extracted:', activity.posts.length, 'posts,', activity.likes.length, 'likes');

            // Extract company info for job scraping
            const companyInfo = extractCompanyInfo();
            console.log('[ContentScript] ✓ Company info:', companyInfo.name || 'Not found');

            // Extract related profiles (People also viewed, People you may know)
            const relatedProfiles = extractRelatedProfiles();
            console.log('[ContentScript] ✓ Related profiles:', relatedProfiles.length, 'found');

            // Detect premium subscription
            const isPremium = detectPremiumSubscription();
            console.log('[ContentScript] ✓ Premium status:', isPremium);

            // Extract profile name
            let profileName = null;
            try {
                const nameElement = document.querySelector('h1.text-heading-xlarge, h1.pv-text-details__left-panel h1, .pv-text-details__left-panel h1, h1[class*="text-heading"]');
                if (nameElement) {
                    profileName = nameElement.innerText?.trim() || null;
                } else {
                    // Fallback: extract from profile text (first line)
                    const lines = profileText.split('\n').filter(line => line.trim().length > 0);
                    if (lines.length > 0) {
                        profileName = lines[0].trim()
                            .replace(/\s*View profile.*$/i, '')
                            .replace(/\s*LinkedIn.*$/i, '')
                            .trim();
                    }
                }
                if (profileName && profileName.length > 100) {
                    profileName = profileName.substring(0, 100);
                }
            } catch (e) {
                console.log('[ContentScript] ⚠ Could not extract profile name:', e.message);
            }
            console.log('[ContentScript] ✓ Profile name:', profileName || 'Not found');

            sendResponse({
                success: true,
                data: profileText,
                activity: activity,
                company: companyInfo,
                relatedProfiles: relatedProfiles,
                isPremium: isPremium,
                profileName: profileName
            });
        } catch (e) {
            console.error('[ContentScript] ✗ Error during scraping:', e);
            sendResponse({ success: false, error: e.message });
        }
        return true;
    }

    if (request.action === 'FETCH_POST_CONTENT') {
        console.log('[ContentScript] 📥 Fetching post content from URL:', request.url);
        
        (async () => {
            try {
                const postContent = await fetchPostContent(request.url);
                sendResponse({ success: true, content: postContent });
            } catch (e) {
                console.error('[ContentScript] ✗ Error fetching post:', e);
                sendResponse({ success: false, error: e.message });
            }
        })();
        
        return true; // Keep channel open for async response
    }

    if (request.action === 'LOAD_RECENT_ACTIVITY') {
        console.log('[ContentScript] 📋 Loading recent activity page...');
        
        (async () => {
            try {
                const activity = await loadRecentActivityPage();
                sendResponse({ success: true, activity: activity });
            } catch (e) {
                console.error('[ContentScript] ✗ Error loading recent activity:', e);
                sendResponse({ success: false, error: e.message });
            }
        })();
        
        return true; // Keep channel open for async response
    }

    if (request.action === 'SCRAPE_JOB') {
        console.log('[ContentScript] 💼 Starting job extraction...');
        
        (async () => {
            try {
                const jobData = extractJobDetails();
                sendResponse({ success: true, data: jobData });
            } catch (e) {
                console.error('[ContentScript] ✗ Error extracting job:', e);
                sendResponse({ success: false, error: e.message });
            }
        })();
        
        return true; // Keep channel open for async response
    }

    return true; // Keep channel open for async response
});

/**
 * Extract recent activity from LinkedIn profile
 */
function extractRecentActivity() {
    console.log('[Activity] Starting activity extraction...');

    const activity = {
        posts: [],
        likes: [],
        comments: []
    };

    // Look for activity feed section
    const activitySection = document.querySelector('[data-view-name="profile-recent-activity"]') ||
        document.querySelector('.pv-recent-activity-section');

    if (!activitySection) {
        console.log('[Activity] ⚠ Activity section not found');
        return activity;
    }

    console.log('[Activity] Found activity section, extracting items...');

    // Extract post items
    const activityItems = activitySection.querySelectorAll('.feed-shared-update-v2, .profile-creator-shared-feed-update__container');

    console.log('[Activity] Found', activityItems.length, 'activity items');

    activityItems.forEach((item, index) => {
        if (index >= 10) return; // Limit to 10 most recent for better coverage

        try {
            const text = item.querySelector('.feed-shared-text, .update-components-text')?.innerText?.trim();
            const type = item.querySelector('.feed-shared-actor__description, .update-components-actor__description')?.innerText?.trim();
            
            // Try to find post URL
            let postUrl = null;
            const linkElement = item.querySelector('a[href*="/feed/update/"], a[href*="/activity-"], a[href*="/posts/"]');
            if (linkElement) {
                postUrl = linkElement.href;
            }
            
            // Try to get full text (expand "see more" if present)
            let fullText = text || '';
            const seeMoreBtn = item.querySelector('button[aria-label*="see more"], .feed-shared-text__see-more');
            if (seeMoreBtn && !seeMoreBtn.classList.contains('expanded')) {
                try {
                    seeMoreBtn.click();
                    // Wait a bit for content to expand
                    setTimeout(() => {
                        const expandedText = item.querySelector('.feed-shared-text, .update-components-text')?.innerText?.trim();
                        if (expandedText && expandedText.length > fullText.length) {
                            fullText = expandedText;
                        }
                    }, 200);
                } catch (e) {
                    console.log('[Activity] Could not expand post', index);
                }
            }

            if (fullText) {
                const activityEntry = {
                    text: fullText.substring(0, 2000), // Increased limit for better context
                    fullText: fullText, // Keep full text
                    type: type || 'post',
                    preview: fullText.substring(0, 100) + '...',
                    url: postUrl,
                    timestamp: item.querySelector('time')?.getAttribute('datetime') || null
                };

                // Categorize by type
                if (type?.toLowerCase().includes('like')) {
                    activity.likes.push(activityEntry);
                } else if (type?.toLowerCase().includes('comment')) {
                    activity.comments.push(activityEntry);
                } else {
                    activity.posts.push(activityEntry);
                }

                console.log('[Activity]  →', activityEntry.type, ':', activityEntry.preview);
            }
        } catch (err) {
            console.log('[Activity] ⚠ Error parsing item', index, ':', err.message);
        }
    });

    console.log('[Activity] ✓ Extracted:', activity.posts.length, 'posts,', activity.likes.length, 'likes,', activity.comments.length, 'comments');

    return activity;
}

/**
 * Extract company information from profile
 */
function extractCompanyInfo() {
    console.log('[Company] Extracting company info...');

    const company = {
        name: '',
        url: '',
        linkedinUrl: ''
    };

    // Try to find current company from experience section
    const experienceSection = document.querySelector('#experience')?.parentElement;
    if (experienceSection) {
        const firstExperience = experienceSection.querySelector('li.artdeco-list__item');
        if (firstExperience) {
            const companyLink = firstExperience.querySelector('a[href*="/company/"]');
            if (companyLink) {
                company.name = companyLink.innerText?.trim() || '';
                company.linkedinUrl = companyLink.href;
                console.log('[Company] ✓ Found company:', company.name);
                console.log('[Company]   LinkedIn URL:', company.linkedinUrl);
            }
        }
    }

    // Alternative: try from profile header
    if (!company.name) {
        const headerCompany = document.querySelector('.pv-text-details__right-panel a[href*="/company/"]');
        if (headerCompany) {
            company.name = headerCompany.innerText?.trim() || '';
            company.linkedinUrl = headerCompany.href;
            console.log('[Company] ✓ Found company (from header):', company.name);
        }
    }

    if (!company.name) {
        console.log('[Company] ⚠ Company not found');
    }

    return company;
}

/**
 * Extract related profiles from "People also viewed" and "People you may know" sections
 */
function extractRelatedProfiles() {
    console.log('[RelatedProfiles] Starting extraction...');
    
    const profiles = [];
    
    // Look for "People also viewed" section
    const alsoViewedSection = document.querySelector('[data-view-name="profile-people-also-viewed-card"], .people-also-viewed, [data-test-id="people-also-viewed"]');
    
    // Look for "People you may know" section
    const mayKnowSection = document.querySelector('[data-view-name="profile-people-you-may-know-card"], .people-you-may-know, [data-test-id="people-you-may-know"]');
    
    // Try alternative selectors
    const sections = [
        alsoViewedSection,
        mayKnowSection,
        document.querySelector('.pvs-list__container'),
        document.querySelector('[data-view-name="profile-people-also-viewed"]'),
        document.querySelector('[data-view-name="profile-people-you-may-know"]')
    ].filter(Boolean);
    
    // Also try finding by text content
    const allSections = document.querySelectorAll('section, div[class*="people"], div[class*="viewed"]');
    allSections.forEach(section => {
        const text = section.innerText || '';
        if (text.includes('People also viewed') || text.includes('People you may know') || text.includes('You may know')) {
            sections.push(section);
        }
    });
    
    console.log(`[RelatedProfiles] Found ${sections.length} potential sections`);
    
    sections.forEach((section, sectionIndex) => {
        // Find profile cards/items
        const profileItems = section.querySelectorAll('li, .pvs-list__item, .entity-result, [data-test-id="people-also-viewed-item"], [data-test-id="people-you-may-know-item"]');
        
        console.log(`[RelatedProfiles] Section ${sectionIndex + 1}: Found ${profileItems.length} items`);
        
        profileItems.forEach((item, index) => {
            if (index >= 10) return; // Limit to 10 per section
            
            try {
                // Extract name
                const nameElement = item.querySelector('.entity-result__title-text a, .pvs-entity__sub-title a, a[href*="/in/"]');
                const name = nameElement?.innerText?.trim() || '';
                
                // Extract profile URL
                let profileUrl = null;
                if (nameElement && nameElement.href) {
                    profileUrl = nameElement.href.split('?')[0]; // Remove query params
                } else {
                    const linkElement = item.querySelector('a[href*="/in/"]');
                    if (linkElement) {
                        profileUrl = linkElement.href.split('?')[0];
                    }
                }
                
                // Extract headline
                const headlineElement = item.querySelector('.entity-result__primary-subtitle, .pvs-entity__caption, .entity-result__summary');
                const headline = headlineElement?.innerText?.trim() || '';
                
                // Extract location (optional)
                const locationElement = item.querySelector('.entity-result__secondary-subtitle, .pvs-entity__sub-title');
                const location = locationElement?.innerText?.trim() || '';
                
                if (name && profileUrl && profileUrl.includes('/in/')) {
                    // Avoid duplicates
                    if (!profiles.some(p => p.url === profileUrl)) {
                        profiles.push({
                            name: name,
                            url: profileUrl,
                            headline: headline,
                            location: location
                        });
                        console.log(`[RelatedProfiles] ✓ Extracted: ${name} - ${headline.substring(0, 50)}`);
                    }
                }
            } catch (err) {
                console.log(`[RelatedProfiles] ⚠ Error parsing item ${index}:`, err.message);
            }
        });
    });
    
    console.log(`[RelatedProfiles] ✓ Extracted ${profiles.length} unique profiles`);
    return profiles;
}

/**
 * Fetch post content from a LinkedIn post URL
 * Note: This tries to extract content from the current page if the post is visible
 * For better results, the post should be loaded in the current tab
 */
async function fetchPostContent(postUrl) {
    console.log('[PostFetch] Attempting to fetch content from:', postUrl);
    
    try {
        const postContent = {
            text: '',
            author: '',
            timestamp: '',
            engagement: {
                likes: 0,
                comments: 0,
                shares: 0
            }
        };
        
        // Check if we're already on a post page
        const currentUrl = window.location.href;
        const isPostPage = currentUrl.includes('/feed/update/') || currentUrl.includes('/activity-') || currentUrl.includes('/posts/');
        
        if (isPostPage && currentUrl.includes(postUrl.split('/').pop())) {
            // We're on the post page, extract content
            console.log('[PostFetch] On post page, extracting content...');
        } else {
            // Try to find post link and navigate
            const postLink = document.querySelector(`a[href*="${postUrl.split('/').pop()}"], a[href="${postUrl}"]`);
            if (postLink) {
                console.log('[PostFetch] Found post link, attempting to extract from current view...');
                // Try to get content from the link's parent container
                const postContainer = postLink.closest('.feed-shared-update-v2, .profile-creator-shared-feed-update__container');
                if (postContainer) {
                    const textElement = postContainer.querySelector('.feed-shared-text, .update-components-text');
                    if (textElement) {
                        postContent.text = textElement.innerText?.trim() || '';
                    }
                }
            }
        }
        
        // Try multiple selectors for post content
        const contentSelectors = [
            '.feed-shared-text',
            '.update-components-text',
            '.feed-shared-update-v2__description',
            '[data-test-id="main-feed-activity-card__commentary"]',
            '.feed-shared-text-view'
        ];
        
        for (const selector of contentSelectors) {
            const element = document.querySelector(selector);
            if (element && element.innerText?.trim()) {
                postContent.text = element.innerText.trim();
                if (postContent.text.length > 50) break; // Got substantial content
            }
        }
        
        // Get author info
        const authorElement = document.querySelector('.feed-shared-actor__name, .update-components-actor__name, .feed-shared-actor__title');
        if (authorElement) {
            postContent.author = authorElement.innerText?.trim() || '';
        }
        
        // Get timestamp
        const timeElement = document.querySelector('time');
        if (timeElement) {
            postContent.timestamp = timeElement.getAttribute('datetime') || timeElement.innerText?.trim() || '';
        }
        
        // Get engagement metrics (simplified)
        const engagementElements = document.querySelectorAll('.social-actions-button, .feed-shared-social-action-bar');
        if (engagementElements.length > 0) {
            engagementElements.forEach(el => {
                const text = el.innerText || '';
                if (text.match(/\d+/)) {
                    const num = parseInt(text.match(/\d+/)[0]);
                    if (text.toLowerCase().includes('like') || text.toLowerCase().includes('reaction')) {
                        postContent.engagement.likes = num;
                    } else if (text.toLowerCase().includes('comment')) {
                        postContent.engagement.comments = num;
                    } else if (text.toLowerCase().includes('share')) {
                        postContent.engagement.shares = num;
                    }
                }
            });
        }
        
        if (postContent.text) {
            console.log('[PostFetch] ✓ Extracted post content:', postContent.text.substring(0, 100));
        } else {
            console.log('[PostFetch] ⚠ Could not extract post content, will use text from activity feed');
        }
        
        return postContent;
    } catch (e) {
        console.error('[PostFetch] ✗ Error:', e);
        // Return empty content rather than throwing, so we can fall back to activity feed text
        return {
            text: '',
            author: '',
            timestamp: '',
            engagement: { likes: 0, comments: 0, shares: 0 }
        };
    }
}

/**
 * Load and extract all posts from the recent activity page
 */
async function loadRecentActivityPage() {
    console.log('[RecentActivity] Starting to extract posts from recent activity page...');
    
    const activity = {
        posts: [],
        likes: [],
        comments: []
    };

    // Wait a bit for page to fully load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Try multiple selectors for post containers
    const postSelectors = [
        '.feed-shared-update-v2',
        '.profile-creator-shared-feed-update__container',
        '.feed-shared-update-v2__description-wrapper',
        '[data-test-id="main-feed-activity-card"]',
        '.update-components-text'
    ];

    let postElements = [];
    for (const selector of postSelectors) {
        postElements = document.querySelectorAll(selector);
        if (postElements.length > 0) {
            console.log(`[RecentActivity] Found ${postElements.length} posts using selector: ${selector}`);
            break;
        }
    }

    if (postElements.length === 0) {
        console.log('[RecentActivity] ⚠ No posts found, trying alternative approach...');
        // Try to find any text containers that might be posts
        postElements = document.querySelectorAll('article, .feed-shared-update-v2, [data-test-id*="activity"]');
    }

    console.log(`[RecentActivity] Processing ${postElements.length} potential posts...`);

    for (let index = 0; index < Math.min(postElements.length, 20); index++) {
        const item = postElements[index];
        
        try {
            // Extract post text
            const textElement = item.querySelector('.feed-shared-text, .update-components-text, .feed-shared-text-view, [data-test-id="main-feed-activity-card__commentary"]');
            let text = textElement?.innerText?.trim() || '';
            
            // Try to expand "see more" if present
            const seeMoreBtn = item.querySelector('button[aria-label*="see more"], .feed-shared-text__see-more');
            if (seeMoreBtn && text.length < 500) {
                try {
                    seeMoreBtn.click();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const expandedText = item.querySelector('.feed-shared-text, .update-components-text')?.innerText?.trim();
                    if (expandedText && expandedText.length > text.length) {
                        text = expandedText;
                    }
                } catch (e) {
                    console.log('[RecentActivity] Could not expand post', index);
                }
            }

            if (!text || text.length < 20) {
                // Try to get text from the entire item
                text = item.innerText?.trim() || '';
            }

            if (text && text.length >= 20) {
                // Extract post URL
                let postUrl = null;
                const linkElement = item.querySelector('a[href*="/feed/update/"], a[href*="/activity-"], a[href*="/posts/"]');
                if (linkElement) {
                    postUrl = linkElement.href;
                } else {
                    // Try to construct URL from data attributes
                    const updateId = item.getAttribute('data-urn') || item.getAttribute('data-activity-id');
                    if (updateId) {
                        const currentUrl = window.location.href;
                        const baseUrl = currentUrl.split('/recent-activity')[0];
                        postUrl = `${baseUrl}/recent-activity/${updateId}/`;
                    }
                }

                // Extract timestamp
                const timeElement = item.querySelector('time');
                const timestamp = timeElement?.getAttribute('datetime') || timeElement?.innerText?.trim() || null;

                // Extract engagement metrics with improved selectors
                const engagement = {
                    likes: 0,
                    comments: 0,
                    shares: 0
                };

                // Try multiple methods to extract engagement
                const engagementText = item.innerText || '';
                
                // Method 1: Regex from text
                const likesMatch = engagementText.match(/(\d+)\s*(?:like|reaction|👍)/i);
                const commentsMatch = engagementText.match(/(\d+)\s*comment/i);
                const sharesMatch = engagementText.match(/(\d+)\s*share/i);

                if (likesMatch) engagement.likes = parseInt(likesMatch[1]);
                if (commentsMatch) engagement.comments = parseInt(commentsMatch[1]);
                if (sharesMatch) engagement.shares = parseInt(sharesMatch[1]);
                
                // Method 2: Look for specific engagement button elements
                const likeButton = item.querySelector('button[aria-label*="like"], button[aria-label*="reaction"], .social-actions-button--reactions');
                const commentButton = item.querySelector('button[aria-label*="comment"], .social-actions-button--comments');
                const shareButton = item.querySelector('button[aria-label*="share"], .social-actions-button--shares');
                
                if (likeButton) {
                    const likeText = likeButton.innerText || likeButton.getAttribute('aria-label') || '';
                    const likeNum = likeText.match(/(\d+)/);
                    if (likeNum && !engagement.likes) {
                        engagement.likes = parseInt(likeNum[1]);
                    }
                }
                
                if (commentButton) {
                    const commentText = commentButton.innerText || commentButton.getAttribute('aria-label') || '';
                    const commentNum = commentText.match(/(\d+)/);
                    if (commentNum && !engagement.comments) {
                        engagement.comments = parseInt(commentNum[1]);
                    }
                }
                
                if (shareButton) {
                    const shareText = shareButton.innerText || shareButton.getAttribute('aria-label') || '';
                    const shareNum = shareText.match(/(\d+)/);
                    if (shareNum && !engagement.shares) {
                        engagement.shares = parseInt(shareNum[1]);
                    }
                }
                
                // Method 3: Look for social action bar
                const socialBar = item.querySelector('.social-actions-bar, .feed-shared-social-action-bar, .update-components-social-actions');
                if (socialBar) {
                    const barText = socialBar.innerText || '';
                    if (!engagement.likes) {
                        const barLikes = barText.match(/(\d+)\s*(?:like|reaction)/i);
                        if (barLikes) engagement.likes = parseInt(barLikes[1]);
                    }
                    if (!engagement.comments) {
                        const barComments = barText.match(/(\d+)\s*comment/i);
                        if (barComments) engagement.comments = parseInt(barComments[1]);
                    }
                    if (!engagement.shares) {
                        const barShares = barText.match(/(\d+)\s*share/i);
                        if (barShares) engagement.shares = parseInt(barShares[1]);
                    }
                }

                const postEntry = {
                    text: text.substring(0, 3000), // Increased limit
                    fullText: text,
                    url: postUrl,
                    timestamp: timestamp,
                    engagement: engagement,
                    type: 'post',
                    preview: text.substring(0, 100) + '...'
                };

                activity.posts.push(postEntry);
                console.log(`[RecentActivity] ✓ Extracted post ${index + 1}: ${postEntry.preview}`);
            }
        } catch (err) {
            console.log(`[RecentActivity] ⚠ Error parsing post ${index}:`, err.message);
        }
    }

    console.log(`[RecentActivity] ✓ Extracted ${activity.posts.length} posts from recent activity page`);
    return activity;
}

/**
 * Extract job details from LinkedIn job posting page
 */
function extractJobDetails() {
    console.log('[JobExtraction] Starting job extraction...');
    
    const jobData = {
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        responsibilities: '',
        jobUrl: window.location.href,
        postedDate: '',
        applicants: '',
        employmentType: '',
        seniorityLevel: '',
        jobFunction: '',
        industries: []
    };
    
    try {
        // Extract job title
        const titleSelectors = [
            'h1.job-details-jobs-unified-top-card__job-title',
            'h1[data-test-id="job-title"]',
            '.jobs-details-top-card__job-title h1',
            'h1.jobs-details__job-title',
            'h1'
        ];
        
        for (const selector of titleSelectors) {
            const titleElement = document.querySelector(selector);
            if (titleElement && titleElement.innerText?.trim()) {
                jobData.title = titleElement.innerText.trim();
                console.log('[JobExtraction] ✓ Title:', jobData.title);
                break;
            }
        }
        
        // Extract company name
        const companySelectors = [
            '.job-details-jobs-unified-top-card__company-name a',
            'a[data-test-id="job-poster"]',
            '.jobs-details-top-card__company-name a',
            '.jobs-details__company-name a',
            'a[href*="/company/"]'
        ];
        
        for (const selector of companySelectors) {
            const companyElement = document.querySelector(selector);
            if (companyElement && companyElement.innerText?.trim()) {
                jobData.company = companyElement.innerText.trim();
                console.log('[JobExtraction] ✓ Company:', jobData.company);
                break;
            }
        }
        
        // Extract location
        const locationSelectors = [
            '.job-details-jobs-unified-top-card__primary-description-without-tagline',
            '.jobs-details-top-card__primary-description',
            '[data-test-id="job-location"]',
            '.jobs-details__primary-description'
        ];
        
        for (const selector of locationSelectors) {
            const locationElement = document.querySelector(selector);
            if (locationElement) {
                const locationText = locationElement.innerText?.trim() || '';
                // Try to extract location from text (usually contains location info)
                if (locationText) {
                    jobData.location = locationText.split('·')[0]?.trim() || locationText;
                    console.log('[JobExtraction] ✓ Location:', jobData.location);
                    break;
                }
            }
        }
        
        // Extract full job description
        const descriptionSelectors = [
            '.jobs-description-content__text',
            '.jobs-description__text',
            '[data-test-id="job-description"]',
            '.jobs-box__html-content',
            '#job-details'
        ];
        
        for (const selector of descriptionSelectors) {
            const descElement = document.querySelector(selector);
            if (descElement && descElement.innerText?.trim()) {
                jobData.description = descElement.innerText.trim();
                console.log('[JobExtraction] ✓ Description extracted:', jobData.description.length, 'chars');
                break;
            }
        }
        
        // If no description found, try to get from main content
        if (!jobData.description) {
            const mainContent = document.querySelector('main') || document.body;
            const allText = mainContent.innerText || '';
            // Try to extract meaningful job description (skip header/nav content)
            const jobSections = allText.split('\n').filter(line => line.trim().length > 20);
            if (jobSections.length > 0) {
                jobData.description = jobSections.join('\n').substring(0, 50000);
            }
        }
        
        // Extract employment type and other metadata
        const metadataText = document.body.innerText || '';
        
        // Look for employment type
        const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Volunteer'];
        for (const type of employmentTypes) {
            if (metadataText.includes(type)) {
                jobData.employmentType = type;
                break;
            }
        }
        
        // Look for seniority level
        const seniorityLevels = ['Internship', 'Entry level', 'Associate', 'Mid-Senior level', 'Director', 'Executive'];
        for (const level of seniorityLevels) {
            if (metadataText.includes(level)) {
                jobData.seniorityLevel = level;
                break;
            }
        }
        
        // Extract posted date
        const dateSelectors = [
            '.jobs-details-top-card__posted-date',
            '[data-test-id="job-posted-date"]',
            '.jobs-details__posted-date'
        ];
        
        for (const selector of dateSelectors) {
            const dateElement = document.querySelector(selector);
            if (dateElement && dateElement.innerText?.trim()) {
                jobData.postedDate = dateElement.innerText.trim();
                break;
            }
        }
        
        // Extract applicant count if available
        const applicantMatch = metadataText.match(/(\d+)\s*(?:applicant|people\s+applied)/i);
        if (applicantMatch) {
            jobData.applicants = applicantMatch[1];
        }
        
        console.log('[JobExtraction] ✓ Job extraction complete');
        console.log('[JobExtraction]   Title:', jobData.title);
        console.log('[JobExtraction]   Company:', jobData.company);
        console.log('[JobExtraction]   Location:', jobData.location);
        console.log('[JobExtraction]   Description length:', jobData.description.length);
        
    } catch (e) {
        console.error('[JobExtraction] ✗ Error:', e);
        throw e;
    }
    
    return jobData;
}

/**
 * Detect if the user has LinkedIn Premium subscription
 * Checks for premium badges, indicators, or premium-specific UI elements
 */
function detectPremiumSubscription() {
    try {
        // Method 1: Check for premium badge/indicator in profile header
        const premiumBadge = document.querySelector('[data-test-id="premium-badge"]') ||
            document.querySelector('.premium-badge') ||
            document.querySelector('[aria-label*="Premium"]') ||
            document.querySelector('[aria-label*="premium"]');
        
        if (premiumBadge) {
            console.log('[Premium] Found premium badge');
            return true;
        }

        // Method 2: Check for premium icon in navigation or profile
        const premiumIcon = document.querySelector('icon-premium') ||
            document.querySelector('[data-test-icon="premium"]') ||
            document.querySelector('.premium-icon');
        
        if (premiumIcon) {
            console.log('[Premium] Found premium icon');
            return true;
        }

        // Method 3: Check for premium text in profile
        const premiumText = document.body.innerText.match(/premium/i);
        if (premiumText) {
            // Check if it's actually about the user's subscription, not just mentioning premium
            const profileSection = document.querySelector('main') || document.body;
            const profileText = profileSection.innerText || '';
            // Look for patterns like "Premium Member", "LinkedIn Premium", etc.
            if (profileText.match(/(?:linkedin\s+)?premium\s+(?:member|subscription|account)/i)) {
                console.log('[Premium] Found premium text indicator');
                return true;
            }
        }

        // Method 4: Check for premium badge in the top navigation
        const navPremium = document.querySelector('nav [data-test-id*="premium"]') ||
            document.querySelector('nav [aria-label*="Premium"]');
        
        if (navPremium) {
            console.log('[Premium] Found premium in navigation');
            return true;
        }

        // Default to false if no premium indicators found
        console.log('[Premium] No premium indicators found, assuming free account');
        return false;
    } catch (e) {
        console.error('[Premium] Error detecting premium status:', e);
        return false; // Default to false on error
    }
}
