document.addEventListener('DOMContentLoaded', async () => {
    // === UI Elements ===
    const apiKeyInput = document.getElementById('apiKey');
    const userGoalInput = document.getElementById('userGoal');
    const icpDefinitionInput = document.getElementById('icpDefinition');
    const offerDetailsInput = document.getElementById('offerDetails');
    const proofPointsInput = document.getElementById('proofPoints');
    const riskLevelInput = document.getElementById('riskLevel');
    const offerTypeInput = document.getElementById('offerType');

    // Main Actions
    const analyzeBtn = document.getElementById('analyzeBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const captureProfileBtn = document.getElementById('captureProfileBtn');
    const buyCreditsBtn = document.getElementById('buyCreditsBtn');
    const creditsDisplay = document.getElementById('creditsDisplay');
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const pricingCards = document.getElementById('pricingCards');
    const currencySelect = document.getElementById('currencySelect');
    const useBackendCreditsCheckbox = document.getElementById('useBackendCredits');
    const creditsSection = document.getElementById('creditsSection');
    const apiKeySection = document.getElementById('apiKeySection');
    const copyEmailBtn = document.querySelector('.copy-email-btn-modern');
    const supportEmail = document.getElementById('supportEmail');
    const openDocumentationBtn = document.getElementById('openDocumentationBtn');
    const userIdDisplay = document.getElementById('userIdDisplay');
    const copyUserIdBtn = document.getElementById('copyUserIdBtn');
    
    // Onboarding elements (will be loaded dynamically)
    let onboardingModal = null;
    let closeOnboardingModal = null;
    let onboardingNext = null;
    let onboardingPrev = null;
    let onboardingSkip = null;
    let onboardingStart = null;
    let onboardingSteps = null;
    let stepDots = null;

    // Status
    const analyzeStatusBadge = document.getElementById('analyzeStatusBadge');
    const senderProfileStatus = document.getElementById('senderProfileStatus');
    const cachedProfilePreview = document.getElementById('cachedProfilePreview');
    const contentStatusBadge = document.getElementById('contentStatusBadge');
    
    // Content Copilot elements
    const generateContentBtn = document.getElementById('generateContentBtn');
    const contentTypeSelect = document.getElementById('contentType');
    const contentTopicInput = document.getElementById('contentTopic');
    
    // Content Setup elements
    const contentGoalInput = document.getElementById('contentGoal');
    const contentIcpInput = document.getElementById('contentIcp');
    const contentExpertiseInput = document.getElementById('contentExpertise');
    const contentProofPointsInput = document.getElementById('contentProofPoints');
    const contentToneSelect = document.getElementById('contentTone');
    const contentCTAInput = document.getElementById('contentCTA');
    const includePersonalStorySelect = document.getElementById('includePersonalStory');
    const generatedContentSection = document.getElementById('generatedContentSection');
    const generatedContentText = document.getElementById('generatedContentText');
    const copyContentBtn = document.getElementById('copyContentBtn');
    const regenerateContentBtn = document.getElementById('regenerateContentBtn');
    const contentCharCount = document.getElementById('contentCharCount');
    const contentWordCount = document.getElementById('contentWordCount');
    const contentReadTime = document.getElementById('contentReadTime');
    const contentStrategyTips = document.getElementById('contentStrategyTips');
    const contentLibrary = document.getElementById('contentLibrary');
    const storedAnalysesList = document.getElementById('storedAnalysesList');
    
    // Content analysis elements
    const analyzeProfileContentBtn = document.getElementById('analyzeProfileContentBtn');
    const contentAnalysisStatusBadge = document.getElementById('contentAnalysisStatusBadge');
    const contentAnalysisResults = document.getElementById('contentAnalysisResults');
    const analyzedTopicsList = document.getElementById('analyzedTopicsList');
    const analyzedContentExamples = document.getElementById('analyzedContentExamples');
    const useAnalyzedTopicsBtn = document.getElementById('useAnalyzedTopicsBtn');
    const suggestTopicsBtn = document.getElementById('suggestTopicsBtn');
    const addCustomTopicBtn = document.getElementById('addCustomTopicBtn');
    const clearTopicBtn = document.getElementById('clearTopicBtn');
    const suggestedTopicsContainer = document.getElementById('suggestedTopicsContainer');
    const customTopicsContainer = document.getElementById('customTopicsContainer');
    const customTopicsList = document.getElementById('customTopicsList');
    const newCustomTopicInput = document.getElementById('newCustomTopicInput');
    const saveCustomTopicBtn = document.getElementById('saveCustomTopicBtn');
    const cancelCustomTopicBtn = document.getElementById('cancelCustomTopicBtn');
    
    // Store analyzed content references
    let analyzedContentReferences = null;

    // Product Navigation
    const productBtns = document.querySelectorAll('.product-btn');
    const marketingNav = document.getElementById('marketing-nav');
    const contentNav = document.getElementById('content-nav');
    const jobsNav = document.getElementById('jobs-nav');
    
    // Container Views
    const tabBtns = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const emptyState = document.getElementById('emptyState');
    const resultsContent = document.getElementById('resultsContent');
    
    // Current product state
    let currentProduct = 'marketing';
    
    // Job Application elements
    const analyzeJobBtn = document.getElementById('analyzeJobBtn');
    const jobAnalysisStatusBadge = document.getElementById('jobAnalysisStatusBadge');
    const jobAnalysisResults = document.getElementById('jobAnalysisResults');
    const jobDetailsDisplay = document.getElementById('jobDetailsDisplay');
    const cvSourceRadios = document.querySelectorAll('input[name="cvSource"]');
    const cvUploadSection = document.getElementById('cvUploadSection');
    const cvFileInput = document.getElementById('cvFileInput');
    const selectCvFileBtn = document.getElementById('selectCvFileBtn');
    const cvFileName = document.getElementById('cvFileName');
    const cvEditorEmptyState = document.getElementById('cvEditorEmptyState');
    const cvEditorContent = document.getElementById('cvEditorContent');
    const cvAnalysisResults = document.getElementById('cvAnalysisResults');
    const cvAnalysisStatus = document.getElementById('cvAnalysisStatus');
    const cvAnalysisStatusText = document.getElementById('cvAnalysisStatusText');
    const cvModularDisplay = document.getElementById('cvModularDisplay');
    const cvMatchScoreContainer = document.getElementById('cvMatchScoreContainer');
    const regenerateAnalysisBtn = document.getElementById('regenerateAnalysisBtn');
    const cvMatchScore = document.getElementById('cvMatchScore');
    const detailedSuggestionsList = document.getElementById('detailedSuggestionsList');
    const jobApplicationsLibrary = document.getElementById('jobApplicationsLibrary');
    const proceedWithCvBtnContainer = document.getElementById('proceedWithCvBtnContainer');
    const proceedWithCvBtn = document.getElementById('proceedWithCvBtn');
    const linkedinProfileStatus = document.getElementById('linkedinProfileStatus');
    
    // Store job and CV data
    let currentJobData = null;
    let currentCvData = null;
    let currentCvSuggestions = null;
    let currentCvStructured = null; // Store structured CV object
    let finalCvStructured = null; // Store final CV with AI additions (hidden, used for download)

    // Result Elements (Scores)
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const influenceCircle = document.getElementById('influenceCircle');
    const influenceValue = document.getElementById('influenceValue');
    const roleMappingBadge = document.getElementById('roleMappingBadge');

    // Result Elements (Context)
    const contextSection = document.getElementById('sharedContextSection');
    const contextScore = document.getElementById('contextScore');
    const contextBadges = document.getElementById('contextBadges');

    // Result Elements (Details)
    const fitReasonsList = document.getElementById('fitReasonsList');
    const missingInfoList = document.getElementById('missingInfoList');
    const decisionReasoningList = document.getElementById('decisionReasoningList');
    const alternateTargetsList = document.getElementById('alternateTargetsList');
    const triggerSignalsList = document.getElementById('triggerSignalsList');
    const mismatchesList = document.getElementById('mismatchesList');
    const multiThreadTargetsList = document.getElementById('multiThreadTargetsList');
    
    // Result Elements (Strategy & Transparency)
    const outreachStrategySection = document.getElementById('outreachStrategySection');
    const strategyApproach = document.getElementById('strategyApproach');
    const strategyRationale = document.getElementById('strategyRationale');
    const strategyTiming = document.getElementById('strategyTiming');
    const confidenceBadge = document.getElementById('confidenceBadge');
    const signalsUsedList = document.getElementById('signalsUsedList');
    const doSayList = document.getElementById('doSayList');
    const dontSayList = document.getElementById('dontSayList');
    
    // Related Profiles
    const relatedProfilesContainer = document.getElementById('relatedProfilesContainer');

    // Draft Tabs
    const draftTabs = document.querySelectorAll('.draft-tab');

    const debugLog = document.getElementById('debugLog');

    // === Helpers ===
    function log(msg) {
        console.log(msg);
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        const ts = new Date().toISOString().split('T')[1].slice(0, 8);
        entry.innerHTML = `<span class="log-ts">[${ts}]</span> ${msg}`;
        debugLog.appendChild(entry);
        debugLog.scrollTop = debugLog.scrollHeight;
    }

    // Settings status indicator
    const settingsStatusIndicator = document.getElementById('settingsStatusIndicator');

    function updateStatus(msg, showInSettings = false) {
        // Update analyze status badge (beside Analyze Profile button)
        if (!showInSettings && analyzeStatusBadge) {
            analyzeStatusBadge.textContent = msg;
        }
        
        // Update settings status indicator (for Capture Profile button)
        if (showInSettings && settingsStatusIndicator) {
            settingsStatusIndicator.textContent = msg;
            settingsStatusIndicator.style.display = 'block';
            settingsStatusIndicator.className = 'settings-status-indicator show';
            // Clear after 3 seconds if it's a success message
            if (msg.includes('Complete') || msg.includes('successfully') || msg.includes('Cached') || msg.includes('Ready')) {
                setTimeout(() => {
                    if (settingsStatusIndicator) {
                        settingsStatusIndicator.style.display = 'none';
                        settingsStatusIndicator.className = 'settings-status-indicator';
                    }
                }, 3000);
            }
        }
        
        log(`Status: ${msg}`);
    }

    log("Extension loaded. Initializing...");

    // === Backend Configuration ===
    const BACKEND_URL = 'http://localhost:3000'; // Change to your production URL
    //const BACKEND_URL = 'https://linkedin.spdr.ltd'; // Change to your production URL
    let userId = null;
    let apiKey = null;

    // Get or create user ID
    async function getUserId() {
        if (userId) return userId;
        const stored = await chrome.storage.local.get('user_id');
        if (stored.user_id) {
            userId = stored.user_id;
        } else {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            await chrome.storage.local.set({ user_id: userId });
        }
        return userId;
    }

    // Get or generate API key
    async function getApiKey() {
        if (apiKey) return apiKey;
        
        // Check if API key is stored
        const stored = await chrome.storage.local.get('api_key');
        if (stored.api_key) {
            apiKey = stored.api_key;
            return apiKey;
        }
        
        // Generate new API key from backend
        try {
            const currentUserId = await getUserId();
            const response = await fetch(`${BACKEND_URL}/api/auth/generate-key`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': currentUserId
                },
                body: JSON.stringify({ userId: currentUserId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate API key');
            }
            
            const data = await response.json();
            apiKey = data.apiKey;
            
            // Store API key securely
            await chrome.storage.local.set({ api_key: apiKey });
            
            log(`[Auth] API key generated and stored`);
            return apiKey;
        } catch (error) {
            log(`[Auth] Error generating API key: ${error.message}`);
            throw error;
        }
    }

    // === Credit Management System ===
    const CREDIT_CONFIG = {
        FREE_TOKENS: 10000,
        TOKEN_COST_PER_1M: {
            'gpt-5.2': { input: 0.15, output: 0.60 }
        }
    };

    /**
     * Count tokens in text (approximate)
     */
    function countTokens(text) {
        if (!text) return 0;
        // Rough approximation: 1 token ≈ 4 characters for English text
        return Math.ceil(text.length / 4);
    }

    /**
     * Get current credits balance
     */
    async function getCredits() {
        try {
            const currentUserId = await getUserId();
            const currentApiKey = await getApiKey();
            const response = await fetch(`${BACKEND_URL}/api/credits`, {
                headers: {
                    'x-api-key': currentApiKey,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    balance: data.balance || 0,
                    used: data.used || 0,
                    remaining: data.remaining || 0
                };
            }
        } catch (e) {
            log(`[Credits] Error fetching credits: ${e.message}`);
        }
        
        // Fallback to local storage
        const stored = await chrome.storage.local.get(['credits_balance', 'credits_used']);
        const balance = stored.credits_balance !== undefined ? stored.credits_balance : CREDIT_CONFIG.FREE_TOKENS;
        const used = stored.credits_used || 0;
        return { balance, used, remaining: balance - used };
    }

    /**
     * Update credits display
     */
    async function updateCreditsDisplay() {
        const useBackend = useBackendCreditsCheckbox.checked;
        if (!useBackend) {
            creditsSection.classList.add('hidden');
            return;
        }
        
        creditsSection.classList.remove('hidden');
        const { remaining, used, balance } = await getCredits();
        const remainingFormatted = remaining.toLocaleString();
        
        if (creditsDisplay) {
            creditsDisplay.textContent = `${remainingFormatted} tokens`;
            if (remaining <= 0) {
                creditsDisplay.style.color = '#f44336';
                creditsDisplay.textContent += ' (Insufficient)';
            } else if (remaining < 1000) {
                creditsDisplay.style.color = '#ffc107';
            } else {
                creditsDisplay.style.color = '#4caf50';
            }
        }
    }

    /**
     * Check if user has enough credits
     */
    async function hasEnoughCredits(estimatedTokens) {
        const { remaining } = await getCredits();
        return remaining >= estimatedTokens;
    }

    /**
     * Wrapper for GPT API calls with credit tracking
     */
    async function callGPTWithTracking(url, options, model = 'gpt-5.2', userApiKey = null, processType = 'gpt_api_call', processDescription = null, prospectId = null,currentUserId) {
        const useBackend = useBackendCreditsCheckbox.checked;
        
        // If user has their own API key and backend is disabled, use it directly
        if (!useBackend && userApiKey && userApiKey.trim()) {
            log("[Credits] Using user's own API key - no credits charged");
            return await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${userApiKey}`
                }
            });
        }

        // Credits mode - use backend proxy
        if (!useBackend) {
            throw new Error('Backend credits disabled and no API key provided');
        }

        const requestBody = JSON.parse(options.body);
        const promptText = requestBody.messages?.map(m => m.content).join(' ') || '';
        const estimatedTokens = countTokens(promptText) + 500; // Add buffer for response
        
        const hasCredits = await hasEnoughCredits(estimatedTokens);
        if (!hasCredits) {
            const error = new Error('INSUFFICIENT_CREDITS');
            error.code = 'INSUFFICIENT_CREDITS';
            throw error;
        }

        // Call backend proxy
        const currentApiKey = await getApiKey();
        const response = await fetch(`${BACKEND_URL}/api/openai-proxy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': currentApiKey
            },
            body: JSON.stringify({
                request: requestBody,
                userId: currentUserId,
                processType: processType,
                processDescription: processDescription || `${processType} using ${model}`,
                prospectId: prospectId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error === 'INSUFFICIENT_CREDITS') {
                const error = new Error('INSUFFICIENT_CREDITS');
                error.code = 'INSUFFICIENT_CREDITS';
                error.remaining = errorData.remaining;
                throw error;
            }
            throw new Error(errorData.error || 'API Error');
        }

        const data = await response.json();
        
        // Update credits display
        await updateCreditsDisplay();
        
        // Return response in OpenAI format
        return {
            ok: true,
            json: async () => data.response
        };
    }

    // Initialize credits display
    updateCreditsDisplay();
    
    // Refresh credits display periodically
    setInterval(updateCreditsDisplay, 30000); // Every 30 seconds

    // === Payment Modal Handlers ===
    let currentCurrency = 'usd';
    
    // Function to render pricing cards based on selected currency
    function renderPricingCards(packages, currency) {
        pricingCards.innerHTML = '';
        packages.forEach((pkg, index) => {
            const price = currency === 'inr' ? (pkg.price_inr || 0) : (pkg.price_usd || 0);
            const symbol = currency === 'inr' ? '₹' : '$';
            
            const card = document.createElement('div');
            card.className = 'pricing-card';
            card.innerHTML = `
                <h3>${pkg.name}</h3>
                <div class="pricing-amount">${symbol}${price.toLocaleString()}</div>
                <div class="pricing-tokens">${pkg.tokens.toLocaleString()} tokens</div>
                <button class="select-plan-btn" data-package-id="${index}">Select Plan</button>
            `;
            pricingCards.appendChild(card);
        });
    }
    
    buyCreditsBtn.addEventListener('click', async () => {
        try {
            // Load packages
            const response = await fetch(`${BACKEND_URL}/api/packages`);
            if (!response.ok) throw new Error('Failed to load packages');
            
            const data = await response.json();
            const packages = data.packages || [];
            
            // Get saved currency preference or default to USD
            const stored = await chrome.storage.local.get('preferred_currency');
            currentCurrency = stored.preferred_currency || 'usd';
            currencySelect.value = currentCurrency;
            
            // Render pricing cards with current currency
            renderPricingCards(packages, currentCurrency);
            
            paymentModal.classList.remove('hidden');
        } catch (e) {
            alert('Failed to load packages: ' + e.message);
        }
    });
    
    // Handle currency change
    currencySelect.addEventListener('change', async (e) => {
        currentCurrency = e.target.value;
        await chrome.storage.local.set({ preferred_currency: currentCurrency });
        
        // Reload packages to re-render with new currency
        try {
            const response = await fetch(`${BACKEND_URL}/api/packages`);
            if (response.ok) {
                const data = await response.json();
                renderPricingCards(data.packages || [], currentCurrency);
            }
        } catch (err) {
            console.error('Error reloading packages:', err);
        }
    });

    closePaymentModal.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
    });

    // Handle pricing card selection
    pricingCards.addEventListener('click', async (e) => {
        if (e.target.classList.contains('select-plan-btn')) {
            const packageId = parseInt(e.target.dataset.packageId);
            
            try {
                const currentApiKey = await getApiKey();
                // Get user ID for checkout session
                const currentUserId = await getUserId();
                
                const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': currentApiKey
                    },
                    body: JSON.stringify({
                        packageId: packageId,
                        userId: currentUserId,
                        currency: currentCurrency
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create checkout session');
                }
                
                const data = await response.json();
                
                
                // Open Stripe checkout in a new window
                const checkoutWindow = window.open(data.url, '_blank', 'width=600,height=700');
                
                // Listen for payment success message from success page
                const messageHandler = async (event) => {
                    if (event.data && event.data.type === 'PAYMENT_SUCCESS') {
                        window.removeEventListener('message', messageHandler);
                        // Wait a moment for webhook to process
                        setTimeout(async () => {
                            await updateCreditsDisplay();
                            paymentModal.classList.add('hidden');
                            //alert('Payment successful! Credits have been added to your account.');
                            log('[Payment] Credits updated after payment');
                        }, 2000);
                    }
                };
                window.addEventListener('message', messageHandler);
                
                // Also poll for window close (fallback method)
                const checkPaymentStatus = setInterval(() => {
                    try {
                        if (checkoutWindow.closed) {
                            clearInterval(checkPaymentStatus);
                            // Wait for webhook to process
                            setTimeout(async () => {
                                await updateCreditsDisplay();
                                log('[Payment] Window closed, credits refreshed');
                            }, 3000);
                        }
                    } catch (e) {
                        // Window might be from different origin, ignore errors
                    }
                }, 1000);
                
                // Cleanup interval after 10 minutes
                setTimeout(() => {
                    clearInterval(checkPaymentStatus);
                    window.removeEventListener('message', messageHandler);
                }, 600000);
            } catch (e) {
                alert('Failed to start checkout: ' + e.message);
            }
        }
    });

    // Toggle backend credits mode
    useBackendCreditsCheckbox.addEventListener('change', async () => {
        const useBackend = useBackendCreditsCheckbox.checked;
        await chrome.storage.local.set({ use_backend_credits: useBackend });
        
        // Update visibility using classList to properly handle .hidden class
        if (useBackend) {
            creditsSection.classList.remove('hidden');
            apiKeySection.classList.add('hidden');
        } else {
            creditsSection.classList.add('hidden');
            apiKeySection.classList.remove('hidden');
        }
        
        await updateCreditsDisplay();
    });

    // === Check for cached analysis on load ===
    async function checkAndShowRegenerateButton() {
        try {
            // Hide by default
            regenerateBtn.classList.add('hidden');
            
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.url && tab.url.includes('linkedin.com/')) {
                const cached = await checkCachedAnalysis(tab.url);
                if (cached) {
                    regenerateBtn.classList.remove('hidden');
                    log("[Cache] Showing regenerate button - cached analysis available");
                } else {
                    regenerateBtn.classList.add('hidden');
                    log("[Cache] No cached analysis - hiding regenerate button");
                }
            } else {
                // Not on LinkedIn page, hide button
                regenerateBtn.classList.add('hidden');
            }
        } catch (e) {
            // On error, hide the button
            regenerateBtn.classList.add('hidden');
            log(`[Cache] Error checking cache: ${e.message}`);
        }
    }
    
    // Hide button initially
    regenerateBtn.classList.add('hidden');
    
    // Check on load
    checkAndShowRegenerateButton();

    // === Load Settings ===
    const stored = await chrome.storage.local.get([
        'openai_api_key', 'user_goal', 'icp_definition',
        'offer_details', 'proof_points', 'risk_level', 'offer_type',
        'sender_profile_cache', 'sender_profile_structured', 'sender_profile_date',
        'use_backend_credits',
        'content_goal', 'content_icp', 'content_expertise', 'content_proof_points'
    ]);

    if (stored.openai_api_key) apiKeyInput.value = stored.openai_api_key;
    if (stored.user_goal) userGoalInput.value = stored.user_goal;
    if (stored.icp_definition) icpDefinitionInput.value = stored.icp_definition;
    if (stored.offer_details) offerDetailsInput.value = stored.offer_details;
    if (stored.proof_points) proofPointsInput.value = stored.proof_points;
    if (stored.risk_level) riskLevelInput.value = stored.risk_level;
    if (stored.offer_type) offerTypeInput.value = stored.offer_type;
    
    // Load Content Copilot settings
    if (stored.content_goal && contentGoalInput) contentGoalInput.value = stored.content_goal;
    if (stored.content_icp && contentIcpInput) contentIcpInput.value = stored.content_icp;
    if (stored.content_expertise && contentExpertiseInput) contentExpertiseInput.value = stored.content_expertise;
    if (stored.content_proof_points && contentProofPointsInput) contentProofPointsInput.value = stored.content_proof_points;
    
    // Load Content Copilot settings
    if (stored.content_goal && contentGoalInput) contentGoalInput.value = stored.content_goal;
    if (stored.content_icp && contentIcpInput) contentIcpInput.value = stored.content_icp;
    if (stored.content_expertise && contentExpertiseInput) contentExpertiseInput.value = stored.content_expertise;
    if (stored.content_proof_points && contentProofPointsInput) contentProofPointsInput.value = stored.content_proof_points;
    
    // Initialize backend credits toggle and API key section visibility
    if (stored.use_backend_credits !== undefined) {
        useBackendCreditsCheckbox.checked = stored.use_backend_credits;
    } else {
        // Default to false (use own API key) if not set
        useBackendCreditsCheckbox.checked = false;
    }
    
    // Set visibility based on checkbox state - use classList to properly handle .hidden class
    const useBackend = useBackendCreditsCheckbox.checked;
    if (useBackend) {
        creditsSection.classList.remove('hidden');
        apiKeySection.classList.add('hidden');
    } else {
        creditsSection.classList.add('hidden');
        apiKeySection.classList.remove('hidden');
    }
    
    await updateCreditsDisplay();

    if (stored.sender_profile_cache) {
        senderProfileStatus.textContent = `Cached: ${stored.sender_profile_date || 'Unknown'}`;
        senderProfileStatus.style.color = '#10b981'; // success info

        // Show structured preview if available, otherwise show text preview
        if (stored.sender_profile_structured) {
            const s = stored.sender_profile_structured;
            let preview = `${s.name}`;
            if (s.headline) preview += `\n${s.headline}`;
            if (s.currentPosition) {
                preview += `\n\nCurrent: ${s.currentPosition.title} at ${s.currentPosition.company}`;
            }
            if (s.education && s.education.length > 0) {
                preview += `\n\nEducation: ${s.education[0].school}`;
                if (s.education.length > 1) preview += ` (+${s.education.length - 1} more)`;
            }
            // Add premium status to preview if available
            if (s.isPremium !== undefined || stored.sender_is_premium !== undefined) {
                const premiumStatus = s.isPremium !== undefined ? s.isPremium : stored.sender_is_premium;
                preview += `\n\nPremium Account: ${premiumStatus ? 'Yes (400 char limit)' : 'No (200 char limit)'}`;
            }
            cachedProfilePreview.textContent = preview;
        } else {
            // Fallback to text preview for old cached data
            cachedProfilePreview.textContent = stored.sender_profile_cache.substring(0, 500) + '...';
        }
    }

    // Display premium status if available
    if (stored.sender_is_premium !== undefined) {
        const premiumStatus = stored.sender_is_premium ? 'Premium (400 char limit)' : 'Free (200 char limit)';
        log(`Sender premium status: ${premiumStatus}`);
    }

    log("Settings loaded.");

    // === Load and Display User ID ===
    async function loadAndDisplayUserId() {
        try {
            const currentUserId = await getUserId();
            if (userIdDisplay) {
                userIdDisplay.textContent = currentUserId;
            }
        } catch (error) {
            log(`Error loading user ID: ${error.message}`);
            if (userIdDisplay) {
                userIdDisplay.textContent = 'Error loading user ID';
            }
        }
    }
    
    // Load user ID on initialization
    loadAndDisplayUserId();

    // === Copy User ID ===
    if (copyUserIdBtn) {
        copyUserIdBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const userId = await getUserId();
            const success = await copyToClipboard(userId);
            
            if (success) {
                copyUserIdBtn.innerHTML = '✓';
                copyUserIdBtn.style.color = '#10b981';
                setTimeout(() => {
                    copyUserIdBtn.innerHTML = '📋';
                    copyUserIdBtn.style.color = '';
                }, 2000);
            } else {
                copyUserIdBtn.innerHTML = '✗';
                copyUserIdBtn.style.color = '#ef4444';
                setTimeout(() => {
                    copyUserIdBtn.innerHTML = '📋';
                    copyUserIdBtn.style.color = '';
                }, 2000);
            }
        });
    }

    // === Onboarding Logic ===
    let currentOnboardingStep = 1;
    const totalOnboardingSteps = 9;

    // Load onboarding modal HTML
    async function loadOnboardingModal() {
        try {
            const container = document.getElementById('onboardingModalContainer');
            if (!container) return;

            const response = await fetch(chrome.runtime.getURL('popup/onboarding-modal.html'));
            const html = await response.text();
            container.innerHTML = html;

            // Update references to onboarding elements
            onboardingModal = document.getElementById('onboardingModal');
            closeOnboardingModal = document.getElementById('closeOnboardingModal');
            onboardingNext = document.getElementById('onboardingNext');
            onboardingPrev = document.getElementById('onboardingPrev');
            onboardingSkip = document.getElementById('onboardingSkip');
            onboardingStart = document.getElementById('onboardingStart');
            onboardingSteps = document.querySelectorAll('.onboarding-step');
            stepDots = document.querySelectorAll('.step-dot');

            // Set up event listeners after loading
            setupOnboardingEventListeners();
        } catch (error) {
            log(`Error loading onboarding modal: ${error.message}`);
        }
    }

    function setupOnboardingEventListeners() {
        // Onboarding event listeners
        if (onboardingNext) {
            onboardingNext.addEventListener('click', nextOnboardingStep);
        }
        
        if (onboardingPrev) {
            onboardingPrev.addEventListener('click', prevOnboardingStep);
        }
        
        if (onboardingStart) {
            onboardingStart.addEventListener('click', completeOnboarding);
        }
        
        if (onboardingSkip) {
            onboardingSkip.addEventListener('click', completeOnboarding);
        }
        
        if (closeOnboardingModal) {
            closeOnboardingModal.addEventListener('click', completeOnboarding);
        }
        
        // Allow clicking step dots to jump to steps
        if (stepDots) {
            stepDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showOnboardingStep(index + 1);
                });
            });
        }
    }

    async function checkAndShowOnboarding() {
        const stored = await chrome.storage.local.get('onboarding_completed');
        if (!stored.onboarding_completed) {
            // Load onboarding modal first
            await loadOnboardingModal();
            // First time user - show onboarding
            if (onboardingModal) {
                showOnboardingStep(1);
                onboardingModal.classList.remove('hidden');
            }
        }
    }

    function showOnboardingStep(step) {
        if (!onboardingSteps || !stepDots) return;
        
        currentOnboardingStep = step;
        
        // Hide all steps
        onboardingSteps.forEach(s => s.classList.remove('active'));
        
        // Show current step
        const currentStepEl = document.querySelector(`.onboarding-step[data-step="${step}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Update step indicators
        stepDots.forEach((dot, index) => {
            if (index + 1 === step) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        if (onboardingPrev) onboardingPrev.style.display = step > 1 ? 'block' : 'none';
        if (onboardingNext) onboardingNext.style.display = step < totalOnboardingSteps ? 'block' : 'none';
        if (onboardingStart) onboardingStart.style.display = step === totalOnboardingSteps ? 'block' : 'none';
        if (onboardingSkip) onboardingSkip.style.display = step < totalOnboardingSteps ? 'block' : 'none';
    }

    function nextOnboardingStep() {
        if (currentOnboardingStep < totalOnboardingSteps) {
            showOnboardingStep(currentOnboardingStep + 1);
        }
    }

    function prevOnboardingStep() {
        if (currentOnboardingStep > 1) {
            showOnboardingStep(currentOnboardingStep - 1);
        }
    }

    async function completeOnboarding() {
        await chrome.storage.local.set({ onboarding_completed: true });
        if (onboardingModal) {
            onboardingModal.classList.add('hidden');
        }
        log("Onboarding completed.");
    }

    // Load onboarding modal on page load
    loadOnboardingModal().then(() => {
        // Check and show onboarding on load
        checkAndShowOnboarding();
    });

    // === Auto-Save ===
    const saveSetting = (key, val) => chrome.storage.local.set({ [key]: val });

    apiKeyInput.addEventListener('change', () => saveSetting('openai_api_key', apiKeyInput.value));
    userGoalInput.addEventListener('change', () => saveSetting('user_goal', userGoalInput.value));
    icpDefinitionInput.addEventListener('change', () => saveSetting('icp_definition', icpDefinitionInput.value));
    offerDetailsInput.addEventListener('change', () => saveSetting('offer_details', offerDetailsInput.value));
    proofPointsInput.addEventListener('change', () => saveSetting('proof_points', proofPointsInput.value));
    riskLevelInput.addEventListener('change', () => saveSetting('risk_level', riskLevelInput.value));
    offerTypeInput.addEventListener('change', () => saveSetting('offer_type', offerTypeInput.value));
    
    // Content Copilot settings auto-save
    if (contentGoalInput) {
        contentGoalInput.addEventListener('change', () => saveSetting('content_goal', contentGoalInput.value));
    }
    if (contentIcpInput) {
        contentIcpInput.addEventListener('change', () => saveSetting('content_icp', contentIcpInput.value));
    }
    if (contentExpertiseInput) {
        contentExpertiseInput.addEventListener('change', () => saveSetting('content_expertise', contentExpertiseInput.value));
    }
    if (contentProofPointsInput) {
        contentProofPointsInput.addEventListener('change', () => saveSetting('content_proof_points', contentProofPointsInput.value));
    }

    // === Product Navigation Logic ===
    function showProduct(product) {
        currentProduct = product;
        
        // Update Product Buttons
        productBtns.forEach(btn => {
            if (btn.dataset.product === product || (product === 'settings' && btn.dataset.target === 'tab-settings')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show/hide product-specific navs
        if (product === 'marketing') {
            if (marketingNav) marketingNav.classList.remove('hidden');
            if (contentNav) contentNav.classList.add('hidden');
            if (jobsNav) jobsNav.classList.add('hidden');
            // Show first marketing tab
            showTab('tab-compose');
        } else if (product === 'content') {
            if (marketingNav) marketingNav.classList.add('hidden');
            if (contentNav) contentNav.classList.remove('hidden');
            if (jobsNav) jobsNav.classList.add('hidden');
            // Show first tab of content (Setup)
            showTab('tab-content-setup');
        } else if (product === 'jobs') {
            if (marketingNav) marketingNav.classList.add('hidden');
            if (contentNav) contentNav.classList.add('hidden');
            if (jobsNav) jobsNav.classList.remove('hidden');
            // Show first jobs tab (Analyze Job) and set it as active
            if (jobsNav) {
                jobsNav.querySelectorAll('.nav-item').forEach((btn, index) => {
                    if (index === 0) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
            showTab('tab-job-analyze');
        } else if (product === 'settings') {
            if (marketingNav) marketingNav.classList.add('hidden');
            if (contentNav) contentNav.classList.add('hidden');
            if (jobsNav) jobsNav.classList.add('hidden');
            // Show settings tab
            showTab('tab-settings');
        }
    }
    
    // === Tab Navigation Logic (within products) ===
    function showTab(targetId) {
        // Update Nav Buttons (only for current product's nav, or if settings)
        if (targetId !== 'tab-settings') {
            let currentNav = null;
            if (currentProduct === 'marketing') {
                currentNav = marketingNav;
            } else if (currentProduct === 'content') {
                currentNav = contentNav;
            } else if (currentProduct === 'jobs') {
                currentNav = jobsNav;
            }
            if (currentNav) {
                currentNav.querySelectorAll('.nav-item').forEach(btn => {
                    if (btn.dataset.target === targetId) btn.classList.add('active');
                    else btn.classList.remove('active');
                });
            }
        }

        // Update Views
        views.forEach(view => {
            if (view.id === targetId) view.classList.remove('hidden');
            else classListAdd(view, 'hidden'); // safe add
        });
        
        // Check regenerate button visibility when switching to compose tab
        if (targetId === 'tab-compose') {
            checkAndShowRegenerateButton();
        }
        
        // Load user ID when switching to settings tab
        if (targetId === 'tab-settings') {
            loadAndDisplayUserId();
        }
        
        // Load content library and stored analyses when switching to content tabs
        if (targetId === 'tab-inspire') {
            loadStoredAnalyses();
        } else if (targetId === 'tab-results-content') {
            loadContentLibrary();
        } else if (targetId === 'tab-create') {
            loadCustomTopics();
        } else if (targetId === 'tab-job-results') {
            loadJobApplicationsLibrary();
        }
    }

    // Safe helper to avoid null errors on classList
    function classListAdd(el, cls) {
        if (el && el.classList) el.classList.add(cls);
    }
    function classListRemove(el, cls) {
        if (el && el.classList) el.classList.remove(cls);
    }

    // Product navigation event listeners
    productBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.product) {
                showProduct(btn.dataset.product);
            } else if (btn.dataset.target === 'tab-settings') {
                showProduct('settings');
            }
        });
    });
    
    // Tab navigation event listeners (within products)
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showTab(btn.dataset.target);
        });
    });

    // Draft Tabs Logic
    draftTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            draftTabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Content
            document.querySelectorAll('.draft-content').forEach(c => classListAdd(c, 'hidden'));
            const target = document.getElementById(btn.dataset.draft);
            if (target) classListRemove(target, 'hidden');
        });
    });

    // === Profile Capture ===
    async function ensureContentScript(tabId) {
        try {
            await chrome.tabs.sendMessage(tabId, { action: 'PING' });
            return true;
        } catch (e) {
            log("Content script missing. Injecting...");
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['scripts/content.js']
                });
                await new Promise(r => setTimeout(r, 100)); // wait for init
                return true;
            } catch (err) {
                log(`Injection failed: ${err.message}`);
                return false;
            }
        }
    }

    captureProfileBtn.addEventListener('click', async () => {
        // Disable button to prevent multiple clicks
        captureProfileBtn.disabled = true;
        captureProfileBtn.style.opacity = '0.6';
        captureProfileBtn.style.cursor = 'not-allowed';
        const originalText = captureProfileBtn.textContent;
        captureProfileBtn.textContent = 'Capturing...';
        
        try {
            //alert('Capture Profile Button Clicked');
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab || !tab.url.includes('linkedin.com/in/')) {
                captureProfileBtn.disabled = false;
                captureProfileBtn.style.opacity = '1';
                captureProfileBtn.style.cursor = 'pointer';
                captureProfileBtn.textContent = originalText;
                alert('Navigate to your own LinkedIn profile first!');
                return;
            }
            // Show status in settings tab
            updateStatus("Capturing...", true);
            if (!(await ensureContentScript(tab.id))) {
                updateStatus("Connection failed", true);
                throw new Error("Connection failed.");
            }

            const response = await chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_PROFILE' });
            log(`Response: success=${response?.success}, hasData=${!!response?.data}, hasStructured=${!!response?.structured}`);
            if (!response?.success) {
                updateStatus("Scrape failed", true);
                throw new Error("Scrape failed.");
            }

            const now = new Date().toLocaleDateString();
            const data = response.data;

            // Use GPT to extract structured data (including premium status)
            updateStatus("Analyzing with AI...", true);
            log("Calling GPT to extract structured data...");
            const currentUserId = await getUserId();
            console.log("Current user ID: " + currentUserId);
            const structured = await extractProfileWithGPT(data, apiKeyInput.value,currentUserId);
            log('GPT extraction complete. Name: \"${structured.name}\"');

            log(`Structured name: "${structured?.name || 'EMPTY'}"`);
            log(`Structured headline: "${structured?.headline || 'EMPTY'}"`);
            log(`Exp count: ${structured?.experience?.length || 0}, Edu count: ${structured?.education?.length || 0} `);
            
            // Get premium status from GPT extraction (fallback to content script detection if not available)
            const isPremium = structured?.isPremium !== undefined ? structured.isPremium : (response.isPremium || false);
            log(`Premium status (GPT detected): ${isPremium ? 'Yes (400 char limit)' : 'No (200 char limit)'}`);

            // Extract and store content context from activity
            const activity = response.activity || { posts: [], likes: [], comments: [] };
            const contentContext = {
                posts: activity.posts.slice(0, 10).map(post => ({
                    text: post.text?.substring(0, 500) || '',
                    url: post.url || ''
                })),
                topics: [], // Will be populated if we analyze
                timestamp: new Date().toISOString()
            };
            
            await chrome.storage.local.set({
                sender_profile_cache: data.substring(0, 20000),
                sender_profile_structured: structured,
                sender_profile_date: now,
                sender_is_premium: isPremium,
                sender_content_context: contentContext
            });

            log("Data saved to chrome.storage.local");

            senderProfileStatus.textContent = `Cached: ${now} `;
            senderProfileStatus.style.color = '#10b981';
            
            // Update status in settings
            updateStatus("Profile captured successfully!", true);

            // Display premium status
            const premiumStatusEl = document.getElementById('senderPremiumStatus');
            if (premiumStatusEl) {
                if (isPremium) {
                    premiumStatusEl.textContent = '✓ Premium Account (400 char limit)';
                    premiumStatusEl.style.color = '#10b981';
                    premiumStatusEl.style.display = 'block';
                } else {
                    premiumStatusEl.textContent = 'Free Account (200 char limit)';
                    premiumStatusEl.style.color = '#6b7280';
                    premiumStatusEl.style.display = 'block';
                }
            }

            // Create a better preview from structured data
            let preview = `${structured.name} `;
            if (structured.headline) preview += `\n${structured.headline} `;
            if (structured.currentPosition) {
                preview += `\n\nCurrent: ${structured.currentPosition.title} at ${structured.currentPosition.company} `;
            }
            if (structured.education && structured.education.length > 0) {
                preview += `\n\nEducation: ${structured.education[0].school} `;
                if (structured.education.length > 1) preview += ` (+${structured.education.length - 1} more)`;
            }
            // Add premium status to preview
            if (structured.isPremium !== undefined) {
                preview += `\n\nPremium Account: ${structured.isPremium ? 'Yes (400 char limit)' : 'No (200 char limit)'}`;
            }

            cachedProfilePreview.textContent = preview;
            updateStatus("Profile captured successfully!", true);
            log("Profile captured.");
        } catch (e) {
            alert(e.message);
            updateStatus("Error", true);
            log(`Profile capture error: ${e.message}`);
        } finally {
            // Re-enable button
            captureProfileBtn.disabled = false;
            captureProfileBtn.style.opacity = '1';
            captureProfileBtn.style.cursor = 'pointer';
            captureProfileBtn.textContent = originalText;
        }
    });

    /**
     * Extract structured profile data using GPT
     */
    async function extractProfileWithGPT(profileText, apiKey, currentUserId) {
        const useBackend = useBackendCreditsCheckbox.checked;
        // Only require API key if not using backend credits
        if (!useBackend && !apiKey) {
            throw new Error("API key required for GPT extraction when not using backend credits");
        }

        const prompt = `Extract structured profile information from this LinkedIn profile text.

LINKEDIN PROFILE TEXT:
${profileText.substring(0, 15000)}

Extract and return ONLY a JSON object with this exact structure:
        {
            "name": "Full Name",
                "headline": "Professional Title/Headline",
                    "location": "City, Country",
                        "about": "About/Summary text",
                            "isPremium": true or false,
                            "currentPosition": {
                "title": "Job Title",
                    "company": "Company Name",
                        "duration": "Time period"
            },
            "experience": [
                {
                    "title": "Job Title",
                    "company": "Company Name",
                    "duration": "Time period",
                    "description": "Role description"
                }
            ],
                "education": [
                    {
                        "school": "School Name",
                        "degree": "Degree/Field",
                        "duration": "Years attended"
                    }
                ]
        }

        Rules:
        - Extract ALL work experience entries(not just current)
            - Extract ALL education entries
                - If information is missing, use empty string ""
                    - For "isPremium": Analyze the profile text to detect if the user has LinkedIn Premium subscription:
                      * Look for Premium badges, icons, or visual indicators mentioned in the text
                      * Check for text mentions of "Premium", "LinkedIn Premium", "Premium Career", "Premium Business", or similar premium-related terms
                      * Look for premium feature indicators or premium account markers
                      * If any premium indicators are found, set isPremium to true, otherwise false
                      * Be conservative - only set to true if you find clear evidence of premium subscription
                    - Return valid JSON only`;

        log("Sending GPT extraction request...");
        const requestBody = {
                model: "gpt-5.2",
                messages: [
                    { role: "system", content: "You are a data extraction assistant. Extract LinkedIn profile data and return valid JSON only." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
        };
        
        const gptResponse = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            'gpt-5.2',
            apiKey,
            'profile_extraction',
            'Extract structured profile data from LinkedIn profile text',
            null,
            currentUserId

        );

        if (!gptResponse.ok) {
            const err = await gptResponse.json();
            throw new Error(err.error?.message || 'GPT API Error');
        }

        const gptData = await gptResponse.json();
        const content = gptData.choices?.[0]?.message?.content || gptData.response?.choices?.[0]?.message?.content;

        log("Received GPT response, parsing JSON...");
        const parsed = JSON.parse(content);
        log(`Parsed profile: ${JSON.stringify(parsed).substring(0, 200)}...`);

        return parsed;
    }

    /**
     * Extract structured prospect data using GPT
     */
    async function extractProspectWithGPT(profileText, activity, apiKey, relatedProfiles = null, prospectId, currentUserId) {
        const useBackend = useBackendCreditsCheckbox.checked;
        // Only require API key if not using backend credits
        if (!useBackend && !apiKey) {
            throw new Error("API key required for prospect extraction when not using backend credits");
        }

        log("[ProspectExtract] Starting extraction...");
        log("[ProspectExtract] Profile text length:", profileText.length);
        log("[ProspectExtract] Activity items:", activity ?
            `${activity.posts.length} posts, ${activity.likes.length} likes, ${activity.comments.length} comments` : 'none');
        //log("[ProspectExtract] Related profiles:", relatedProfiles ? `${relatedProfiles.length} profiles` : 'none');

        // Format activity for the extraction prompt
        let activityText = '';
        if (activity && (activity.posts.length > 0 || activity.likes.length > 0 || activity.comments.length > 0)) {
            activityText = '\n\nRECENT ACTIVITY:\n';
            if (activity.posts.length > 0) {
                activityText += 'Posts:\n';
                activity.posts.forEach((post, i) => {
                    activityText += `${i + 1}. ${post.text.substring(0, 300)}\n`;
                });
            }
            if (activity.likes.length > 0) {
                activityText += '\nLiked:\n';
                activity.likes.forEach((like, i) => {
                    activityText += `${i + 1}. ${like.text.substring(0, 200)}\n`;
                });
            }
            if (activity.comments.length > 0) {
                activityText += '\nCommented on:\n';
                activity.comments.forEach((comment, i) => {
                    activityText += `${i + 1}. ${comment.text.substring(0, 200)}\n`;
                });
            }
        }

        const prompt = `Extract structured profile data from this LinkedIn prospect.

LINKEDIN PROFILE TEXT:
${profileText.substring(0, 30000)}
${activityText}

Extract and return ONLY a JSON object with this structure:
{
  "name": "Full Name",
  "headline": "Professional Title/Headline",
  "location": "City, Country",
  "about": "About/Summary section text",
  "currentPosition": {
    "title": "Current Job Title",
    "company": "Current Company Name",
    "duration": "Time period (e.g., 2022 - Present)"
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Time period",
      "description": "Brief role description"
    }
  ],
  "education": [
    {
      "school": "School Name",
      "degree": "Degree and Field",
      "duration": "Years (e.g., 2010 - 2014)"
    }
  ],
  "interests": {
    "topics": ["topic1", "topic2"],
    "professionalFocus": ["focus area 1", "focus area 2"],
    "recentEngagement": "Brief summary of what they're posting/engaging with based on activity"
  },
  "relatedProfiles": [
    {
      "name": "Full Name",
      "url": "LinkedIn profile URL",
      "headline": "Profile headline/title",
      "location": "Location if available"
    }
  ]
}

RULES:
- Extract ALL experience and education entries
- If info missing, use empty string ""
- For interests, analyze their recent posts/likes to identify topics
- For relatedProfiles, extract ALL profiles mentioned in the "People also viewed" or "People you may know" sections
- Include name, LinkedIn URL, headline, and location for each related profile
- If no related profiles found, return empty array []
- Return valid JSON only`;

        log("[ProspectExtract] Sending to GPT...");
        const requestBody = {
                model: "gpt-5.2",
                messages: [
                    { role: "system", content: "You are a data extraction assistant. Extract LinkedIn profile data and return valid JSON only." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
        };
        
        const response = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            'gpt-5.2',
            apiKey,
            'post_summarization',
            'Summarize posts and extract prospect interests',
            prospectId || null
            ,currentUserId
        );

        if (!response.ok) {
            const err = await response.json();
            log("[ProspectExtract] ✗ API Error:", err.error?.message);
            throw new Error(err.error?.message || 'GPT API Error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;

        log("[ProspectExtract] ✓ Received response, parsing...");
        const parsed = JSON.parse(content);
        log("[ProspectExtract] ✓ Extracted:", parsed.name);
        log("[ProspectExtract]   Company:", parsed.currentPosition?.company || 'N/A');
        log("[ProspectExtract]   Interests:", parsed.interests?.topics?.join(', ') || 'N/A');

        return parsed;
    }

    /**
     * Fetch post content from URLs using content script
     */
    async function fetchPostsFromUrls(postUrls, tabId) {
        if (!postUrls || postUrls.length === 0) {
            log("[PostFetch] No post URLs provided");
            return [];
        }

        log(`[PostFetch] Fetching content from ${postUrls.length} post URLs...`);
        const fetchedPosts = [];

        for (let i = 0; i < Math.min(postUrls.length, 5); i++) { // Limit to 5 posts
            const url = postUrls[i];
            if (!url) continue;

            try {
                log(`[PostFetch] Fetching post ${i + 1}/${Math.min(postUrls.length, 5)}: ${url}`);
                
                // Send message to content script to fetch post content
                const response = await chrome.tabs.sendMessage(tabId, {
                    action: 'FETCH_POST_CONTENT',
                    url: url
                });

                if (response?.success && response.content) {
                    fetchedPosts.push({
                        url: url,
                        text: response.content.text,
                        author: response.content.author,
                        timestamp: response.content.timestamp,
                        engagement: response.content.engagement
                    });
                    log(`[PostFetch] ✓ Fetched post ${i + 1}: ${response.content.text.substring(0, 50)}...`);
                } else {
                    log(`[PostFetch] ⚠ Failed to fetch post ${i + 1}`);
                }
            } catch (e) {
                log(`[PostFetch] ✗ Error fetching post ${i + 1}: ${e.message}`);
            }
        }

        return fetchedPosts;
    }

    /**
     * Summarize posts and extract prospect interests using GPT
     * Now filters to only include posts with important content
     */
    async function summarizePostsAndExtractInterests(posts, postUrls, tabId, apiKey, prospectId = null, currentUserId) {
        const useBackend = useBackendCreditsCheckbox.checked;
        // Only require API key if not using backend credits
        if (!useBackend && !apiKey) {
            throw new Error("API key required for post summarization when not using backend credits");
        }
        
        let postsToAnalyze = [];
        
        // If we have post URLs, fetch full content from them
        if (postUrls && postUrls.length > 0 && tabId) {
            log("[PostSummary] Fetching full post content from URLs...");
            const fetchedPosts = await fetchPostsFromUrls(postUrls, tabId);
            postsToAnalyze = fetchedPosts;
        } else if (posts && posts.length > 0) {
            // Fallback to posts from activity feed
            postsToAnalyze = posts.map(p => ({
                url: p.url,
                text: p.text || p.fullText || '',
                timestamp: p.timestamp
            }));
        }
        
        if (postsToAnalyze.length === 0) {
            log("[PostSummary] No posts available");
            return null;
        }

        log(`[PostSummary] Analyzing ${postsToAnalyze.length} posts...`);

        // First, use GPT to identify which posts have important content
        const postsText = postsToAnalyze.map((post, index) => {
            return `Post ${index + 1}${post.url ? ` (${post.url})` : ''}:\n${post.text}\n${post.timestamp ? `Posted: ${post.timestamp}` : ''}\n`;
        }).join('\n---\n\n');

        const filterPrompt = `You are analyzing LinkedIn posts to identify which ones contain important, actionable content for sales outreach.

POSTS TO ANALYZE:
${postsText.substring(0, 20000)}

For each post, determine if it contains:
- Professional insights or thought leadership
- Pain points or challenges mentioned
- Buying signals (initiatives, projects, needs)
- Industry trends or discussions
- Personal interests that could be conversation starters
- Questions or engagement that shows active interest

Return ONLY a JSON object with this structure:
{
  "importantPosts": [
    {
      "index": 1,
      "url": "post url if available",
      "importanceScore": number (0-100),
      "reason": "Why this post is important",
      "keyContent": "The most important part of this post"
    }
  ],
  "summary": "Brief summary of what types of important content were found"
}

Rules:
- Only include posts with importanceScore >= 50
- Focus on posts with actionable insights for outreach
- Return valid JSON only`;

        log("[PostSummary] Filtering posts for important content...");
        const filterRequestBody = {
            model: "gpt-5.2",
            messages: [
                { role: "system", content: "You are a sales intelligence assistant. Identify important posts. Return valid JSON only." },
                { role: "user", content: filterPrompt }
            ],
            temperature: 0.2,
            response_format: { type: "json_object" }
        };
        
        const filterResponse = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterRequestBody)
            },
            'gpt-5.2',
            apiKey,
            'post_filtering',
            'Filter important posts from prospect activity',
            null
        );

        if (!filterResponse.ok) {
            const err = await filterResponse.json();
            log("[PostSummary] ✗ Filter API Error:", err.error?.message);
            if (err.error === 'INSUFFICIENT_CREDITS' || err.code === 'INSUFFICIENT_CREDITS') {
                const error = new Error('INSUFFICIENT_CREDITS');
                error.code = 'INSUFFICIENT_CREDITS';
                throw error;
            }
            throw new Error(err.error?.message || 'Post Filtering API Error');
        }

        const filterData = await filterResponse.json();
        const filterContent = filterData.choices?.[0]?.message?.content || filterData.response?.choices?.[0]?.message?.content;
        const filterResult = JSON.parse(filterContent);

        log(`[PostSummary] ✓ Identified ${filterResult.importantPosts?.length || 0} important posts`);

        // Filter posts to only include important ones
        const importantPosts = postsToAnalyze.filter((post, index) => {
            return filterResult.importantPosts?.some(ip => ip.index === index + 1 && ip.importanceScore >= 50);
        });

        if (importantPosts.length === 0) {
            log("[PostSummary] No important posts found, using all posts");
            // Fallback to all posts if none are marked important
        } else {
            postsToAnalyze = importantPosts;
            log(`[PostSummary] Using ${postsToAnalyze.length} important posts for detailed analysis`);
        }

        // Now summarize the important posts
        const importantPostsText = postsToAnalyze.map((post, index) => {
            const filterInfo = filterResult.importantPosts?.find(ip => 
                postsToAnalyze.indexOf(post) === ip.index - 1 || 
                (post.url && ip.url && post.url.includes(ip.url.split('/').pop()))
            );
            return `Post ${index + 1}${post.url ? ` (${post.url})` : ''}:\n${post.text}\n${filterInfo ? `Importance: ${filterInfo.reason}` : ''}\n`;
        }).join('\n---\n\n');

        const prompt = `You are analyzing a prospect's LinkedIn posts to understand their interests, professional focus, and potential buying signals.

IMPORTANT POSTS (filtered for actionable content):
${importantPostsText.substring(0, 15000)}

Analyze these posts and provide:
1. **Key Topics**: What subjects/themes do they post about most?
2. **Professional Focus**: What are their main professional interests and concerns?
3. **Pain Points**: What challenges or problems do they mention or hint at?
4. **Buying Signals**: Any indicators of initiatives, projects, or needs that suggest they might be looking for solutions?
5. **Engagement Patterns**: What types of content do they create (thought leadership, questions, updates, etc.)?
6. **Industry Trends**: What industry trends or topics are they discussing?
7. **Personal Interests**: Any personal interests that could be conversation starters?

Return ONLY a JSON object with this structure:
{
  "summary": "Overall summary of their posting activity and themes",
  "keyTopics": ["topic1", "topic2", "topic3"],
  "professionalFocus": ["focus1", "focus2"],
  "painPoints": ["pain point 1", "pain point 2"],
  "buyingSignals": ["signal1", "signal2"],
  "engagementPatterns": ["pattern1", "pattern2"],
  "industryTrends": ["trend1", "trend2"],
  "personalInterests": ["interest1", "interest2"],
  "topPosts": [
    {
      "index": 1,
      "summary": "Brief summary of this post",
      "keyInsight": "Main insight or hook from this post",
      "relevanceToOutreach": "Why this post is relevant for outreach"
    }
  ],
  "outreachHooks": ["hook1 based on posts", "hook2 based on posts"],
  "conversationStarters": ["starter1", "starter2"]
}

Rules:
- Be specific and actionable
- Focus on insights that can be used in personalized outreach
- Identify concrete buying signals when present
- Return valid JSON only`;

        log("[PostSummary] Sending summarization request to GPT...");
        const requestBody = {
            model: "gpt-5.2",
            messages: [
                { role: "system", content: "You are a sales intelligence assistant. Analyze posts and extract actionable insights. Return valid JSON only." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3,
            response_format: { type: "json_object" }
        };
        
        const response = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            'gpt-5.2',
            apiKey,
            'post_summarization',
            'Summarize posts and extract prospect interests',
            prospectId || null
        );

        if (!response.ok) {
            const err = await response.json();
            log("[PostSummary] ✗ API Error:", err.error?.message);
            throw new Error(err.error?.message || 'Post Summarization API Error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;

        log("[PostSummary] ✓ Received response, parsing...");
        const parsed = JSON.parse(content);
        log(`[PostSummary] ✓ Extracted ${parsed.keyTopics?.length || 0} topics, ${parsed.buyingSignals?.length || 0} buying signals`);
        
        return parsed;
    }

    /**
     * Analyze related profiles to find relevant prospects
     */
    async function analyzeRelatedProfiles(profiles, sellerGoal, icpDefinition, sellerOffer, apiKey, prospectId) {
        const useBackend = useBackendCreditsCheckbox.checked;
        // Only require API key if not using backend credits
        if (!useBackend && !apiKey) {
            throw new Error("API key required for profile analysis when not using backend credits");
        }
        if (!profiles || profiles.length === 0) {
            log("[RelatedProfiles] No profiles to analyze");
            return [];
        }

        log(`[RelatedProfiles] Analyzing ${profiles.length} profiles for relevance...`);

        const profilesText = profiles.map((profile, index) => {
            return `Profile ${index + 1}:
Name: ${profile.name}
Headline: ${profile.headline}
Location: ${profile.location || 'Not specified'}
LinkedIn: ${profile.url}`;
        }).join('\n\n---\n\n');

        const prompt = `You are analyzing LinkedIn profiles to identify which ones are relevant prospects for a seller.

SELLER CONTEXT:
- Goal: ${sellerGoal || 'Not specified'}
- ICP Definition: ${icpDefinition || 'Not specified'}
- Offer: ${sellerOffer || 'Not specified'}

RELATED PROFILES:
${profilesText}

For each profile, determine:
1. **Relevance Score (0-100)**: How well does this profile match the ICP?
2. **Fit Reasons**: Why this profile might be a good fit (industry, role, company, etc.)
3. **Potential Value**: Why this person might need the seller's offer
4. **Decision Power**: Likely buyer / influencer / not relevant

Return ONLY a JSON object with this structure:
{
  "relevantProfiles": [
    {
      "name": "Full Name",
      "url": "LinkedIn profile URL",
      "headline": "Profile headline",
      "relevanceScore": number (0-100),
      "fitReasons": ["reason1", "reason2"],
      "potentialValue": "Why they might need the offer",
      "decisionPower": "Buyer | Influencer | Not Relevant"
    }
  ]
}

Rules:
- Only include profiles with relevanceScore >= 50
- Sort by relevanceScore (highest first)
- Limit to top 5 most relevant profiles
- Be specific about why each profile is relevant
- Return valid JSON only`;

        log("[RelatedProfiles] Sending analysis request to GPT...");
        const requestBody = {
            model: "gpt-5.2",
            messages: [
                { role: "system", content: "You are a sales intelligence assistant. Analyze profiles and return valid JSON only." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3,
            response_format: { type: "json_object" }
        };
        
        const response = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            'gpt-5.2',
            apiKey,
            'related_profiles_analysis',
            'Analyze related profiles for relevance to seller',
            prospectId || null
        );

        if (!response.ok) {
            const err = await response.json();
            log("[RelatedProfiles] ✗ API Error:", err.error?.message);
            if (err.error === 'INSUFFICIENT_CREDITS' || err.code === 'INSUFFICIENT_CREDITS') {
                const error = new Error('INSUFFICIENT_CREDITS');
                error.code = 'INSUFFICIENT_CREDITS';
                throw error;
            }
            throw new Error(err.error?.message || 'Related Profiles Analysis API Error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;

        log("[RelatedProfiles] ✓ Received response, parsing...");
        const parsed = JSON.parse(content);
        const relevant = parsed.relevantProfiles || [];
        
        // Preserve original URLs from input profiles if GPT didn't return them or returned invalid ones
        const profilesMap = new Map();
        profiles.forEach(p => {
            if (p.name && p.url) {
                // Use lowercase name as key for matching
                const key = p.name.toLowerCase().trim();
                profilesMap.set(key, p.url);
            }
        });

        // Merge GPT analysis with original profile data to preserve URLs
        const enrichedProfiles = relevant.map(gptProfile => {
            const nameKey = gptProfile.name?.toLowerCase().trim();
            const originalUrl = profilesMap.get(nameKey);
            
            // Use GPT URL if it's valid, otherwise use original URL
            let finalUrl = gptProfile.url || originalUrl || '';
            
            // Validate URL format
            if (finalUrl && !finalUrl.startsWith('http') && !finalUrl.startsWith('/')) {
                // If it's just a handle, construct full URL
                finalUrl = 'https://www.linkedin.com/in/' + finalUrl.replace(/^\/+|\/+$/g, '');
            }
            
            return {
                ...gptProfile,
                url: finalUrl,
                // Also preserve original headline and location if GPT didn't return them
                headline: gptProfile.headline || profiles.find(p => p.name?.toLowerCase().trim() === nameKey)?.headline || '',
                location: gptProfile.location || profiles.find(p => p.name?.toLowerCase().trim() === nameKey)?.location || ''
            };
        });

        log(`[RelatedProfiles] ✓ Found ${enrichedProfiles.length} relevant profiles`);
        log(`[RelatedProfiles] URLs preserved: ${enrichedProfiles.filter(p => p.url).length}/${enrichedProfiles.length}`);
        
        return enrichedProfiles;
    }

    /**
     * Render related profiles in the UI
     */
    function renderRelatedProfiles(profiles) {
        if (!profiles || profiles.length === 0) {
            relatedProfilesContainer.innerHTML = '<p class="empty-state">No relevant related profiles found.</p>';
            return;
        }

        relatedProfilesContainer.innerHTML = '';
        
        profiles.forEach((profile, index) => {
            const profileCard = document.createElement('div');
            profileCard.className = 'related-profile-card';
            
            const scoreColor = profile.relevanceScore >= 70 ? '#4caf50' : profile.relevanceScore >= 50 ? '#ffc107' : '#f44336';
            
            // Ensure URL is properly formatted
            let profileUrl = profile.url || '';
            
            // Log for debugging
            if (!profileUrl) {
                log(`[RelatedProfiles] ⚠ Profile "${profile.name}" has no URL in render function`);
            } else {
                log(`[RelatedProfiles] Profile "${profile.name}" URL: ${profileUrl}`);
            }
            
            // Normalize URL format
            if (profileUrl) {
                // Remove query parameters and fragments
                profileUrl = profileUrl.split('?')[0].split('#')[0];
                
                if (profileUrl.startsWith('http://') || profileUrl.startsWith('https://')) {
                    // Already a full URL, ensure it's https
                    profileUrl = profileUrl.replace(/^http:\/\//, 'https://');
                } else if (profileUrl.startsWith('/')) {
                    profileUrl = 'https://www.linkedin.com' + profileUrl;
                } else if (profileUrl.startsWith('linkedin.com')) {
                    profileUrl = 'https://www.' + profileUrl;
                } else if (profileUrl.includes('/in/')) {
                    profileUrl = 'https://www.linkedin.com' + (profileUrl.startsWith('/') ? '' : '/') + profileUrl;
                } else {
                    // If it's just a username/handle, construct the full URL
                    profileUrl = 'https://www.linkedin.com/in/' + profileUrl.replace(/^\/+|\/+$/g, '');
                }
                
                log(`[RelatedProfiles] Normalized URL for "${profile.name}": ${profileUrl}`);
            }
            
            // Create link element - use span if no URL, otherwise use anchor
            const nameElement = profileUrl 
                ? `<a href="${profileUrl}" target="_blank" class="profile-link" data-url="${profileUrl}" style="color: #0a66c2; text-decoration: none; cursor: pointer;"><strong>${profile.name || 'Unknown'}</strong></a>`
                : `<strong class="profile-name-no-link" style="color: #666;">${profile.name || 'Unknown'}</strong> <span style="font-size: 11px; color: #999;">(No URL available)</span>`;
            
            profileCard.innerHTML = `
                <div class="profile-header">
                    <div class="profile-info">
                        ${nameElement}
                        <div class="profile-headline">${profile.headline || 'N/A'}</div>
                    </div>
                    <div class="relevance-score" style="color: ${scoreColor}">
                        ${profile.relevanceScore || 0}
                    </div>
                </div>
                <div class="profile-details">
                    <div class="fit-reasons">
                        <strong>Fit:</strong> ${profile.fitReasons?.join(', ') || 'N/A'}
                    </div>
                    <div class="potential-value">
                        <strong>Value:</strong> ${profile.potentialValue || 'N/A'}
                    </div>
                    <div class="decision-power">
                        <strong>Role:</strong> ${profile.decisionPower || 'N/A'}
                    </div>
                </div>
            `;
            
            relatedProfilesContainer.appendChild(profileCard);
        });

        // Add click handlers to open profiles in new tabs
        relatedProfilesContainer.querySelectorAll('.profile-link').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = link.getAttribute('data-url') || link.getAttribute('href');
                if (url) {
                    // Ensure URL is a full LinkedIn URL
                    let fullUrl = url;
                    if (!url.startsWith('http')) {
                        if (url.startsWith('/')) {
                            fullUrl = 'https://www.linkedin.com' + url;
                        } else {
                            fullUrl = 'https://www.linkedin.com/in/' + url;
                        }
                    }
                    log(`[RelatedProfiles] Opening profile: ${fullUrl}`);
                    try {
                        await chrome.tabs.create({ url: fullUrl, active: true });
                    } catch (error) {
                        log(`[RelatedProfiles] Error opening profile: ${error.message}`);
                        // Fallback: try opening in current window
                        window.open(fullUrl, '_blank');
                    }
                } else {
                    log('[RelatedProfiles] No URL found for profile link');
                }
            });
        });
    }

    /**
     * Research companies from prospect's experience in context of seller's offer
     */
    async function researchCompanies(structuredProspect, sellerOffer, sellerGoal, icpDefinition, apiKey, prospectId) {
        const useBackend = useBackendCreditsCheckbox.checked;
        // Only require API key if not using backend credits
        if (!useBackend && !apiKey) {
            throw new Error("API key required for company research when not using backend credits");
        }
        if (!structuredProspect || !structuredProspect.experience || structuredProspect.experience.length === 0) {
            log("[CompanyResearch] No experience data available");
            return null;
        }

        log("[CompanyResearch] Starting company research...");
        
        // Extract unique companies from experience
        const companies = [];
        const seenCompanies = new Set();
        
        // Add current company
        if (structuredProspect.currentPosition?.company) {
            companies.push({
                name: structuredProspect.currentPosition.company,
                role: structuredProspect.currentPosition.title,
                duration: structuredProspect.currentPosition.duration,
                isCurrent: true
            });
            seenCompanies.add(structuredProspect.currentPosition.company.toLowerCase());
        }
        
        // Add past companies
        structuredProspect.experience.forEach(exp => {
            const companyName = exp.company?.trim();
            if (companyName && !seenCompanies.has(companyName.toLowerCase())) {
                companies.push({
                    name: companyName,
                    role: exp.title || 'Unknown',
                    duration: exp.duration || 'Unknown',
                    description: exp.description || '',
                    isCurrent: false
                });
                seenCompanies.add(companyName.toLowerCase());
            }
        });

        if (companies.length === 0) {
            log("[CompanyResearch] No companies found in prospect experience");
            return null;
        }

        log(`[CompanyResearch] Researching ${companies.length} companies: ${companies.map(c => c.name).join(', ')}`);

        const prompt = `You are a sales research assistant. Analyze companies from a prospect's work history in the context of what a seller is trying to sell.

SELLER CONTEXT:
- Goal: ${sellerGoal || 'Not specified'}
- Offer: ${sellerOffer || 'Not specified'}
- ICP Definition: ${icpDefinition || 'Not specified'}

PROSPECT'S COMPANIES:
${JSON.stringify(companies, null, 2)}

For each company, provide concise research on:
1. **Company Fit**: How well does this company match the ICP? (Industry, size, geography, etc.)
2. **Relevance to Offer**: Why might this company need or benefit from the seller's offer?
3. **Prospect's Role Context**: How does the prospect's role at this company relate to the seller's offer?
4. **Buying Signals**: Any indicators that this company might be a good fit (based on industry trends, company type, role responsibilities)
5. **Potential Challenges**: Why this company might NOT be a fit

Focus on the CURRENT company first, then past companies if relevant.

Return ONLY a JSON object with this structure:
{
  "currentCompany": {
    "companyName": "Company Name",
    "fitScore": number (0-100),
    "relevanceToOffer": "Why this company might need the offer",
    "roleContext": "How prospect's role relates to offer",
    "buyingSignals": ["signal1", "signal2"],
    "challenges": ["challenge1", "challenge2"],
    "researchSummary": "Concise summary of company fit and relevance"
  },
  "pastCompanies": [
    {
      "companyName": "Company Name",
      "fitScore": number (0-100),
      "relevanceToOffer": "Brief relevance",
      "roleContext": "How role relates",
      "researchSummary": "Brief summary"
    }
  ],
  "overallCompanyInsights": "Overall insights about prospect's company background in relation to seller's offer",
  "bestCompanyFit": "Which company (current or past) shows the strongest fit and why"
}

Rules:
- Be concise but specific
- Focus on actionable insights
- If information is unclear, note it but still provide analysis
- Return valid JSON only`;

        log("[CompanyResearch] Sending research request to GPT...");
        const requestBody = {
            model: "gpt-5.2",
            messages: [
                { role: "system", content: "You are a sales research assistant. Analyze companies and return valid JSON only." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3,
            response_format: { type: "json_object" }
        };
        
        const response = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            'gpt-5.2',
            apiKey,
            'company_research',
            'Research companies from prospect work history',
            prospectId || null
        );

        if (!response.ok) {
            const err = await response.json();
            log("[CompanyResearch] ✗ API Error:", err.error?.message);
            throw new Error(err.error?.message || 'Company Research API Error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;

        log("[CompanyResearch] ✓ Received response, parsing...");
        const parsed = JSON.parse(content);
        log(`[CompanyResearch] ✓ Research complete for ${parsed.currentCompany?.companyName || 'companies'}`);

        return parsed;
    }

    // === Helper Functions for Analysis ===
    function setScore(circle, label, value) {
        const val = value || 0;
        label.textContent = val;
        circle.className = 'score-circle'; // reset
        if (val >= 80) circle.classList.add('score-high');
        else if (val >= 50) circle.classList.add('score-med');
        else circle.classList.add('score-low');
    }

    function renderList(element, items) {
        element.innerHTML = '';
        if (!items || items.length === 0) {
            const li = document.createElement('li');
            li.textContent = "None identified.";
            element.appendChild(li);
            return;
        }
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            element.appendChild(li);
        });
    }

    // === Copy Email Address ===
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const email = 'manish.neo@gmail.com';
            const success = await copyToClipboard(email);
            
            if (success) {
                copyEmailBtn.innerHTML = '✓';
                copyEmailBtn.style.color = '#10b981';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '📋';
                    copyEmailBtn.style.color = '';
                }, 2000);
            } else {
                copyEmailBtn.innerHTML = '✗';
                copyEmailBtn.style.color = '#ef4444';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '📋';
                    copyEmailBtn.style.color = '';
                }, 2000);
            }
        });
    }

    // === Open Documentation ===
    if (openDocumentationBtn) {
        openDocumentationBtn.addEventListener('click', () => {
            chrome.tabs.create({
                url: chrome.runtime.getURL('popup/documentation.html')
            });
        });
    }

    // === Copy to Clipboard Helper ===
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (fallbackErr) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    }

    // === Add Copy Icon to Message ===
    function addCopyIcon(container, messageText) {
        if (!messageText || messageText === 'No draft.' || messageText === 'No variants generated.' || messageText === 'No sequence generated.') {
            return; // Don't add copy icon for empty messages
        }

        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-icon-btn';
        copyBtn.innerHTML = '📋';
        copyBtn.title = 'Copy to clipboard';
        copyBtn.setAttribute('aria-label', 'Copy message to clipboard');
        
        // Extract just the message text (remove HTML tags and strategy label)
        let messageOnly = messageText;
        
        // For connection request and cold email, extract from container HTML
        if (container.id === 'connRequest' || container.id === 'coldEmail') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = container.innerHTML;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            // Remove strategy label (everything before the first double line break)
            const parts = textContent.split('\n\n');
            messageOnly = parts.length > 1 ? parts.slice(1).join('\n\n').trim() : textContent.trim();
        } else {
            // For variant and sequence items, use the message text directly
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = messageText;
            messageOnly = tempDiv.textContent || tempDiv.innerText || messageText;
        }
        
        copyBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const success = await copyToClipboard(messageOnly);
            if (success) {
                copyBtn.innerHTML = '✓';
                copyBtn.style.color = '#10b981';
                setTimeout(() => {
                    copyBtn.innerHTML = '📋';
                    copyBtn.style.color = '';
                }, 2000);
            } else {
                copyBtn.innerHTML = '✗';
                copyBtn.style.color = '#ef4444';
                setTimeout(() => {
                    copyBtn.innerHTML = '📋';
                    copyBtn.style.color = '';
                }, 2000);
            }
        });

        // Insert copy button at the beginning of the container
        if (container.firstChild) {
            container.insertBefore(copyBtn, container.firstChild);
        } else {
            container.appendChild(copyBtn);
        }
    }

    function renderResults(data, riskStrategy) {
        emptyState.classList.add('hidden');
        resultsContent.classList.remove('hidden');

        // Scores
        setScore(scoreCircle, scoreValue, data.fitScore);
        setScore(influenceCircle, influenceValue, data.influenceScore);

        // Role Mapping
        const mapping = data.roleMapping || "Unknown";
        roleMappingBadge.textContent = mapping;
        roleMappingBadge.className = 'role-badge';
        if (mapping.includes('Buyer')) roleMappingBadge.classList.add('role-buyer');
        else if (mapping.includes('Influencer')) roleMappingBadge.classList.add('role-influencer');
        else roleMappingBadge.classList.add('role-avoid');

        // Shared Context Banner
        if (contextSection && data.sharedContextScore && data.sharedContextScore > 20) {
            contextSection.classList.remove('hidden');
            contextSection.style.display = 'block';
            if (contextScore) {
            contextScore.textContent = `${data.sharedContextScore} % Match`;
            }
            if (contextBadges) {
            contextBadges.innerHTML = '';

            (data.sharedSignals || []).forEach(signal => {
                const badge = document.createElement('span');
                badge.className = 'context-badge';
                badge.textContent = signal; // e.g., "🎓 Same College"
                contextBadges.appendChild(badge);
            });
            }
            log(`[SharedContext] ✓ Displaying shared context: ${data.sharedContextScore}% match with ${data.sharedSignals?.length || 0} signals`);
        } else {
            if (contextSection) {
            contextSection.classList.add('hidden');
                contextSection.style.display = 'none';
            }
            log(`[SharedContext] Hidden - score: ${data.sharedContextScore || 'N/A'}`);
        }

        // Lists
        renderList(fitReasonsList, data.fitReasons);
        renderList(missingInfoList, data.missingInfo);
        renderList(decisionReasoningList, data.decisionReasoning);
        renderList(alternateTargetsList, data.alternateTargets);
        renderList(triggerSignalsList, data.triggerSignals);
        renderList(mismatchesList, data.mismatches);
        renderList(multiThreadTargetsList, data.multiThreadTargets);

        // Outreach Strategy
        if (data.outreachStrategy) {
            outreachStrategySection.classList.remove('hidden');
            strategyApproach.textContent = data.outreachStrategy.recommendedApproach || 'Not specified';
            strategyRationale.textContent = data.outreachStrategy.rationale || '';
            strategyTiming.textContent = data.outreachStrategy.timing ? `⏰ ${data.outreachStrategy.timing}` : '';
        } else {
            outreachStrategySection.classList.add('hidden');
        }

        // Transparency Layer
        if (data.confidence) {
            confidenceBadge.textContent = data.confidence;
            confidenceBadge.className = 'confidence-' + data.confidence.toLowerCase();
        }
        renderList(signalsUsedList, data.signalsUsed);
        renderList(doSayList, data.doSay);
        renderList(dontSayList, data.dontSay);

        // Drafts with Strategy Label
        let strategyLabel = `Strategy: ${riskStrategy} | ${data.draftStrategy || 'Standard'}`;
        // If context was used
        if (data.sharedContextScore > 50 && riskStrategy !== 'Safe') {
            strategyLabel += ` | 🤝 Warm Intro Used`;
        }
        if (data.outreachStrategy?.recommendedApproach) {
            strategyLabel += ` | ${data.outreachStrategy.recommendedApproach}`;
        }

        const connRequestEl = document.getElementById('connRequest');
        connRequestEl.innerHTML = `<strong>${strategyLabel}</strong><br/><br/>${data.connectionRequest || "No draft."}`;
        addCopyIcon(connRequestEl, data.connectionRequest);

        const coldEmailEl = document.getElementById('coldEmail');
        coldEmailEl.innerHTML = `<strong>${strategyLabel}</strong><br/><br/>${data.coldEmail || "No draft."}`;
        addCopyIcon(coldEmailEl, data.coldEmail);

        // Message Variants
        const messageVariantsEl = document.getElementById('messageVariants');
        if (data.messageVariants) {
            let variantsHtml = `<strong>Message Variants</strong><br/><br/>`;
            if (data.messageVariants.shortPunchy) {
                variantsHtml += `<div class="variant-section" data-message="${data.messageVariants.shortPunchy.replace(/"/g, '&quot;')}"><strong>Short Punchy:</strong><br/>${data.messageVariants.shortPunchy}</div><br/>`;
            }
            if (data.messageVariants.credibilityFirst) {
                variantsHtml += `<div class="variant-section" data-message="${data.messageVariants.credibilityFirst.replace(/"/g, '&quot;')}"><strong>Credibility-First:</strong><br/>${data.messageVariants.credibilityFirst}</div><br/>`;
            }
            if (data.messageVariants.insightLed) {
                variantsHtml += `<div class="variant-section" data-message="${data.messageVariants.insightLed.replace(/"/g, '&quot;')}"><strong>Insight-Led / Value-First:</strong><br/>${data.messageVariants.insightLed}</div><br/>`;
            }
            if (data.messageVariants.softAsk) {
                variantsHtml += `<div class="variant-section" data-message="${data.messageVariants.softAsk.replace(/"/g, '&quot;')}"><strong>Soft-Ask / Low-Friction:</strong><br/>${data.messageVariants.softAsk}</div>`;
            }
            messageVariantsEl.innerHTML = variantsHtml;
            
            // Add copy icons to each variant
            messageVariantsEl.querySelectorAll('.variant-section').forEach(section => {
                const messageText = section.getAttribute('data-message');
                if (messageText) {
                    addCopyIcon(section, messageText);
                }
            });
        } else {
            messageVariantsEl.innerHTML = 'No variants generated.';
        }

        // Message Sequence
        const messageSequenceEl = document.getElementById('messageSequence');
        if (data.messageSequence) {
            let sequenceHtml = `<strong>Complete Outreach Sequence</strong><br/><br/>`;
            if (data.messageSequence.firstMessage) {
                sequenceHtml += `<div class="sequence-item" data-message="${data.messageSequence.firstMessage.replace(/"/g, '&quot;')}"><strong>First Message:</strong><br/>${data.messageSequence.firstMessage}</div><br/>`;
            }
            if (data.messageSequence.followUp1) {
                sequenceHtml += `<div class="sequence-item" data-message="${data.messageSequence.followUp1.replace(/"/g, '&quot;')}"><strong>Follow-up 1 (2-3 days):</strong><br/>${data.messageSequence.followUp1}</div><br/>`;
            }
            if (data.messageSequence.followUp2) {
                sequenceHtml += `<div class="sequence-item" data-message="${data.messageSequence.followUp2.replace(/"/g, '&quot;')}"><strong>Follow-up 2 (1 week):</strong><br/>${data.messageSequence.followUp2}</div><br/>`;
            }
            if (data.messageSequence.followUp3) {
                sequenceHtml += `<div class="sequence-item" data-message="${data.messageSequence.followUp3.replace(/"/g, '&quot;')}"><strong>Follow-up 3 (2 weeks):</strong><br/>${data.messageSequence.followUp3}</div><br/>`;
            }
            if (data.messageSequence.breakupMessage) {
                sequenceHtml += `<div class="sequence-item" data-message="${data.messageSequence.breakupMessage.replace(/"/g, '&quot;')}"><strong>Breakup Message:</strong><br/>${data.messageSequence.breakupMessage}</div>`;
            }
            messageSequenceEl.innerHTML = sequenceHtml;
            
            // Add copy icons to each sequence item
            messageSequenceEl.querySelectorAll('.sequence-item').forEach(item => {
                const messageText = item.getAttribute('data-message');
                if (messageText) {
                    addCopyIcon(item, messageText);
                }
            });
        } else {
            messageSequenceEl.innerHTML = 'No sequence generated.';
        }
    }

    async function callOpenAI(inputs, senderStructured, activity, company, structuredProspect, companyResearch, postSummary, prospectId = null) {
        log("[CallOpenAI] Structured sender: " + (senderStructured ? senderStructured.name : 'none'));
        log("[CallOpenAI] Structured prospect: " + (structuredProspect ? structuredProspect.name : 'none'));
        log("[CallOpenAI] Sender preview: " + (senderStructured ? `${senderStructured.name} - ${senderStructured.headline || 'N/A'}` : "N/A"));
        log("[CallOpenAI] Prospect preview: " + (structuredProspect ? `${structuredProspect.name} - ${structuredProspect.headline || 'N/A'}` : "N/A"));

        log("[CallOpenAI] Activity: " + (activity ? `${activity.posts.length} posts, ${activity.likes.length} likes` : 'none'));
        log("[CallOpenAI] Company: " + (company?.name || 'none'));
        log("[CallOpenAI] Company Research: " + (companyResearch ? `Available for ${companyResearch.currentCompany?.companyName || 'companies'}` : 'Not available'));
        log("[CallOpenAI] Post Summary: " + (postSummary ? `Available - ${postSummary.keyTopics?.length || 0} topics, ${postSummary.buyingSignals?.length || 0} signals` : 'Not available'));

        // Get sender premium status
        const senderStorage = await chrome.storage.local.get('sender_is_premium');
        const senderIsPremium = senderStorage.sender_is_premium || false;
        log("[CallOpenAI] Sender premium status: " + (senderIsPremium ? 'Premium (400 char limit)' : 'Free (200 char limit)'));

        // Note: We use postSummary instead of raw activity content for efficiency and better insights

        const prompt = `
You are an elite Sales Copilot.

# INPUTS

## 1. YOU Layer(The Seller)
    - Goal: ${inputs.goal}
    - Offer: ${inputs.offer}
    - Proof Points: ${inputs.proof}
    - ICP: ${inputs.icp}

    [SENDER PROFILE STRUCTURED DATA]
        ${senderStructured ? JSON.stringify(senderStructured, null, 2) : "No sender profile provided."}
        This is the structured profile data of the seller (you). Use this to:
        - Find shared connections, experiences, or education with the prospect
        - Identify common ground for personalization
        - Understand the seller's background and credibility
        - Match sender's experience with prospect's needs

## 2. PLAY Layer(The Strategy)
    - Risk Level: ${inputs.risk}
    - Offer Type: ${inputs.offerType}

## 3. THEM Layer(Prospect Data)
    [STRUCTURED PROSPECT DATA]
        ${structuredProspect ? JSON.stringify(structuredProspect, null, 2) : 'Not available'}
        This is the complete structured profile data of the prospect. Use this for all analysis.
        The structured data includes: name, headline, location, about, current position, experience history, education, interests, and related profiles.
    
    [COMPANY INFO]
        ${company ? `Company: ${company.name}\nLinkedIn URL: ${company.linkedinUrl || 'N/A'}` : 'Not available'}

    [COMPANY RESEARCH]
        ${companyResearch ? JSON.stringify(companyResearch, null, 2) : 'Not available'}
        This research analyzes companies from the prospect's work history in context of the seller's offer.
        Use this to:
        - Understand company fit and relevance
        - Identify buying signals from company background
        - Contextualize the prospect's role in relation to the offer
        - Reference specific company insights in messaging

    [POST SUMMARY & INTERESTS]
        ${postSummary ? JSON.stringify(postSummary, null, 2) : 'Not available'}
        **IMPORTANT: Use this post summary object instead of raw post content. This contains analyzed and summarized insights from the prospect's LinkedIn activity.**
        This is a detailed analysis of the prospect's LinkedIn posts, summarizing their content and extracting:
        - Key topics and professional focus areas
        - Pain points and challenges mentioned
        - Buying signals from their posts
        - Engagement patterns and content types
        - Industry trends they discuss
        - Personal interests
        - Specific outreach hooks and conversation starters from their posts
        Use this to:
        - Reference specific posts or topics in messaging
        - Use their own words and interests as hooks
        - Identify buying signals from their content
        - Create personalized conversation starters
        - Align messaging with their professional focus
        **Do NOT request or use raw post content - all post insights are in this summary object.**

# INSTRUCTIONS

## A.MATCHING ENGINE(Sender vs Prospect)
Compare the SENDER and PROSPECT profiles to find specific overlaps:
        1. ** Identity **: Same College / University, Ex - Company(Alumni), Same Current Industry ?
        2. ** Location **: Same City / Region ?
        3. ** Shared Context Score(0 - 100) **: Rate the strengthen of the personal connection.
   - 80 +: Same Company same time OR Close friend connection visible.
   - 60 +: Same School OR Same Ex - Company.
   - 40 +: Same City + Industry.
   - < 20: No overlap.

## B.SCORING & MAPPING
    - ** Fit Score(0 - 100) **: Match vs ICP. Consider:
        - Industry match
        - Company size (if available from company info or company research)
        - Geography (if available)
        - Role/function alignment
        - Trigger signals from posts/activity
        - **Company Research Insights**: Use the company research to understand fit based on prospect's current and past companies
        - Weight the current company research more heavily than past companies
    - ** Influence Score(0 - 100) **: Decision Power Score. Assess:
        - Seniority level (from structured data: currentPosition.title, experience)
        - Company size and role scope
        - Authority indicators in headline/about
    - ** Role Mapping **: Classify as: Buyer / Strong Influencer / Champion / Not Ideal
    - ** Trigger Signals **: Identify initiative hints from posts/role language that suggest buying intent


## C. INTEREST MAPPING
Use the structured prospect data AND the detailed post summary to analyze:
- **Topics of Interest**: What subjects do they post about or engage with? (Use postSummary.keyTopics)
- **Professional Focus**: Career themes visible in their content (Use postSummary.professionalFocus)
- **Pain Points**: What challenges do they mention? (Use postSummary.painPoints)
- **Outreach Hooks**: Specific posts or topics that could be referenced (Use postSummary.outreachHooks and postSummary.topPosts)
- **Trigger Signals**: Look for initiative hints from posts/role language that indicate buying intent (Use postSummary.buyingSignals)
- **Conversation Starters**: Use postSummary.conversationStarters for natural openings

## D.MESSAGING ENGINE
Generate "Connection Request" & "Cold Email" using ** ${inputs.risk} ** strategy.

**CONNECTION REQUEST LENGTH LIMIT**:
${senderIsPremium ? '- Sender has LinkedIn Premium subscription - Connection request can be up to 400 characters' : '- Sender has free LinkedIn account - Connection request must be maximum 200 characters'}
- Keep the connection request concise and impactful
- Every word counts, especially for free accounts (200 char limit)
- Premium accounts (400 char limit) can include more context and personalization

- ** IF Shared Context > 50 AND Risk != 'Safe' **:
        - USE THE SHARED SIGNAL as the hook(e.g. "Saw we both worked at Oracle...").
- ** ELSE IF Post Summary has strong hooks **:
        - Reference specific posts or topics from postSummary (e.g., "Saw your post about [topic] - really resonated with...").
        - Use conversation starters from postSummary.conversationStarters.
        - Reference their pain points or buying signals from posts.
- ** ELSE IF Company Research shows strong fit **:
        - Reference company-specific insights from the research (e.g., "Noticed you're at [Company] - companies in your industry often face [relevant challenge]").
        - Use buying signals identified in company research.
- ** ELSE **:
        - Use standard hooks: Role, Industry, Post, or trigger signals from their activity/interests.

**PRIORITY**: When post summary is available, prioritize using:
- Specific post references (postSummary.topPosts)
- Their own words and topics (postSummary.keyTopics)
- Buying signals from posts (postSummary.buyingSignals)
- Conversation starters (postSummary.conversationStarters)

**IMPORTANT**: When company research is available, incorporate specific insights about:
- Why their current/past companies might need the offer
- How their role relates to the seller's solution
- Company-specific buying signals or challenges

## E. OUTREACH STRATEGY ENGINE
Based on the analysis, recommend the best outreach approach:
- **Direct Pitch**: Only when strong fit (Fit Score > 70) and clear decision-maker
- **Warm-up**: Comment/like + DM sequence when shared context exists or trigger signals present
- **Referral Route**: Suggest "who owns X?" approach when influencer but not buyer
- **Multi-threading**: Recommend 2-4 roles to engage in the same company
- **Partner-led**: When relevant partnerships exist
- **Timing Suggestions**: When to reach out based on activity patterns

Generate multiple message variants:
- **Short Punchy**: Concise, direct, attention-grabbing
- **Credibility-first**: Lead with proof points and case studies
- **Insight-led / Value-first**: Lead with valuable insights or industry trends
- **Soft-ask / Low-friction**: Gentle approach with minimal commitment ask

Also generate complete sequences:
- **First Message**: Initial outreach
- **Follow-up 1**: First follow-up (2-3 days later)
- **Follow-up 2**: Second follow-up (1 week later)
- **Follow-up 3**: Final follow-up (2 weeks later)
- **Breakup Message**: Polite exit if no response

# OUTPUT SCHEMA(JSON)
{
            "fitScore": number,
            "fitReasons": ["reason1", "reason2"],
            "missingInfo": ["info1", "info2"],
            "triggerSignals": ["signal1", "signal2"],
            "mismatches": ["mismatch1", "mismatch2"],
            "influenceScore": number,
            "roleMapping": "string",
            "decisionReasoning": ["reason1"],
            "alternateTargets": ["Title 1 at Company", "Title 2 at Company"],
            "multiThreadTargets": ["Role 1", "Role 2", "Role 3"],
            "sharedContextScore": number,
            "sharedSignals": ["🎓 Same College: Stanford", "🏢 Ex-Google", "🌍 SF Bay Area"],
            "outreachStrategy": {
                "recommendedApproach": "Direct Pitch | Warm-up | Referral | Multi-threading | Partner-led",
                "rationale": "Why this approach",
                "timing": "When to reach out"
            },
            "messageVariants": {
                "shortPunchy": "text...",
                "credibilityFirst": "text...",
                "insightLed": "text...",
                "softAsk": "text..."
            },
            "messageSequence": {
                "firstMessage": "text...",
                "followUp1": "text...",
                "followUp2": "text...",
                "followUp3": "text...",
                "breakupMessage": "text..."
            },
            "connectionRequest": "text... (MUST be ${senderIsPremium ? 'maximum 400 characters' : 'maximum 200 characters'} - ${senderIsPremium ? 'premium account allows longer messages' : 'free account has strict 200 character limit'})",
            "coldEmail": "text...",
            "draftStrategy": "Brief description of the angle used",
            "signalsUsed": ["signal1", "signal2"],
            "confidence": "High | Medium | Low",
            "doSay": ["do say this", "do say that"],
            "dontSay": ["don't say this", "don't say that"]
        }
            `;

        log("Sending request to OpenAI...");
        log("Final Prompt: " + prompt);
        const requestBody = {
                model: "gpt-5.2",
                messages: [
                    { role: "system", content: "You are a JSON-speaking sales strategist." },
                    { role: "user", content: prompt }
                ],
                temperature: inputs.risk === 'Risky' ? 0.9 : 0.5,
                response_format: { type: "json_object" }
        };
        
        const response = await callGPTWithTracking(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            },
            'gpt-5.2',
            inputs.apiKey,
            'sales_analysis',
            'Generate fit score, outreach strategy, and personalized messages',
            prospectId || null
        );

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || 'OpenAI API Error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;

        try {
            return JSON.parse(content);
        } catch (e) {
            throw new Error("Failed to parse AI response as JSON.");
        }
    }

    // === Save analysis to backend ===
    async function saveAnalysisToBackend(analysisPayload) {
        try {
            const currentUserId = await getUserId();
            const currentApiKey = await getApiKey();
            const response = await fetch(`${BACKEND_URL}/api/analyses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': currentApiKey
                },
                body: JSON.stringify(analysisPayload)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save analysis');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            log(`[SaveAnalysis] Error: ${error.message}`);
            throw error;
        }
    }

    // === Check for cached analysis ===
    async function checkCachedAnalysis(profileUrl) {
        const cacheKey = `analysis_${profileUrl}`;
        const cached = await chrome.storage.local.get(cacheKey);
        if (cached[cacheKey]) {
            log(`[Cache] Found cached analysis for ${profileUrl}`);
            return cached[cacheKey];
        }
        return null;
    }

    // === Regenerate Messages (Reuse Research) ===
    regenerateBtn.addEventListener('click', async () => {
        // Disable button to prevent multiple clicks
        regenerateBtn.disabled = true;
        regenerateBtn.style.opacity = '0.6';
        regenerateBtn.style.cursor = 'not-allowed';
        const originalText = regenerateBtn.textContent;
        regenerateBtn.textContent = 'Regenerating...';
        
        try {
            const inputData = {
                apiKey: apiKeyInput.value.trim(),
                goal: userGoalInput.value.trim(),
                icp: icpDefinitionInput.value.trim(),
                offer: offerDetailsInput.value.trim(),
                proof: proofPointsInput.value.trim(),
                risk: riskLevelInput.value,
                offerType: offerTypeInput.value
            };

            // Check if using backend credits or own API key
            const useBackend = useBackendCreditsCheckbox.checked;
            if (!useBackend && !inputData.apiKey) {
                regenerateBtn.disabled = false;
                regenerateBtn.style.opacity = '1';
                regenerateBtn.style.cursor = 'pointer';
                regenerateBtn.textContent = originalText;
                return updateStatus('Missing API Key');
            }
            if (!inputData.goal) {
                regenerateBtn.disabled = false;
                regenerateBtn.style.opacity = '1';
                regenerateBtn.style.cursor = 'pointer';
                regenerateBtn.textContent = originalText;
                return updateStatus('Missing Goal');
            }

            // Check credits if using backend
            if (useBackend) {
                const estimatedTokens = 5000; // Rough estimate for full analysis
                const hasCredits = await hasEnoughCredits(estimatedTokens);
                if (!hasCredits) {
                    regenerateBtn.disabled = false;
                    regenerateBtn.style.opacity = '1';
                    regenerateBtn.style.cursor = 'pointer';
                    regenerateBtn.textContent = originalText;
                    const buyCredits = confirm('Insufficient credits. Would you like to buy more?');
                    if (buyCredits) {
                        showTab('tab-settings');
                        buyCreditsBtn.click();
                    }
                    return updateStatus('Insufficient Credits');
                }
            }
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab || !tab.url.includes('linkedin.com/')) throw new Error('Go to LinkedIn Profile');

            const profileUrl = tab.url;
            const cached = await checkCachedAnalysis(profileUrl);
            
            if (!cached) {
                alert('No cached analysis found. Please run full analysis first.');
                return;
            }

            updateStatus("Regenerating messages...");
            log("[Regenerate] Using cached research data");
            log(`[Regenerate] Strategy: ${inputData.risk} | ${inputData.offerType}`);

            const senderStructured = (await chrome.storage.local.get('sender_profile_structured')).sender_profile_structured;

            if (!senderStructured) {
                alert('Please capture your profile first in Settings tab.');
                showTab('tab-settings');
                return;
            }

            // Only regenerate messages with new strategy
            updateStatus("Generating messages...");
            const analysis = await callOpenAI(
                inputData, 
                senderStructured, 
                cached.activity, 
                cached.company,
                cached.structuredProspect,
                cached.companyResearch,
                cached.postSummary
            );

            // Render the results
            renderResults(analysis, inputData.risk);
            
            // Save regenerated analysis to backend if using backend credits
            if (useBackend) {
                try {
                    // Get prospectId from cached data or current profile
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    if (tab && tab.url.includes('linkedin.com/in/')) {
                        // Try to get prospectId from backend by profile URL
                        const currentApiKey = await getApiKey();
                        const prospectResponse = await fetch(`${BACKEND_URL}/api/prospects`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': currentApiKey
                            },
                            body: JSON.stringify({ linkedinProfileUrl: tab.url })
                        });
                        
                        if (prospectResponse.ok) {
                            const prospectResult = await prospectResponse.json();
                            if (prospectResult.prospectId) {
                                await saveAnalysisToBackend({
                                    prospectId: prospectResult.prospectId,
                                    sellerGoal: inputData.goal,
                                    sellerOffer: inputData.offer,
                                    sellerIcp: inputData.icp,
                                    sellerProof: inputData.proof,
                                    sellerRiskLevel: inputData.risk,
                                    sellerOfferType: inputData.offerType,
                                    analysisData: analysis
                                });
                                log("[SaveAnalysis] ✓ Regenerated analysis saved to backend");
                            }
                        }
                    }
                } catch (saveError) {
                    log(`[SaveAnalysis] ⚠ Failed to save regenerated analysis: ${saveError.message}`);
                    // Don't block the UI if save fails
                }
            }
            
            showTab('tab-results');
            updateStatus("Messages regenerated!");
            log("Message regeneration complete.");

        } catch (e) {
            alert(e.message);
            updateStatus("Error");
            log(`Regeneration error: ${e.message}`);
        } finally {
            // Re-enable button
            regenerateBtn.disabled = false;
            regenerateBtn.style.opacity = '1';
            regenerateBtn.style.cursor = 'pointer';
            regenerateBtn.textContent = originalText;
        }
    });

    // === Analysis Logic ===
    analyzeBtn.addEventListener('click', async () => {
        // Disable button to prevent multiple clicks
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = '0.6';
        analyzeBtn.style.cursor = 'not-allowed';
        const originalText = analyzeBtn.textContent;
        analyzeBtn.textContent = 'Analyzing...';
        
        try {
            const inputData = {
                apiKey: apiKeyInput.value.trim(),
                goal: userGoalInput.value.trim(),
                icp: icpDefinitionInput.value.trim(),
                offer: offerDetailsInput.value.trim(),
                proof: proofPointsInput.value.trim(),
                risk: riskLevelInput.value,
                offerType: offerTypeInput.value
            };

            // Check if using backend credits or own API key
            const useBackend = useBackendCreditsCheckbox.checked;
            if (!useBackend && !inputData.apiKey) {
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
                analyzeBtn.style.cursor = 'pointer';
                analyzeBtn.textContent = originalText;
                return updateStatus('Missing API Key');
            }
            if (!inputData.goal) {
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
                analyzeBtn.style.cursor = 'pointer';
                analyzeBtn.textContent = originalText;
                return updateStatus('Missing Goal');
            }

            const currentUserId = await getUserId();
            // Check credits if using backend
            if (useBackend) {
                const estimatedTokens = 5000; // Rough estimate for full analysis
                const hasCredits = await hasEnoughCredits(estimatedTokens);
                if (!hasCredits) {
                    analyzeBtn.disabled = false;
                    analyzeBtn.style.opacity = '1';
                    analyzeBtn.style.cursor = 'pointer';
                    analyzeBtn.textContent = originalText;
                    const buyCredits = confirm('Insufficient credits. Would you like to buy more?');
                    if (buyCredits) {
                        showTab('tab-settings');
                        buyCreditsBtn.click();
                    }
                    return updateStatus('Insufficient Credits');
                }
            }

            const senderStructured = (await chrome.storage.local.get('sender_profile_structured')).sender_profile_structured;

            if (!senderStructured) {
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
                analyzeBtn.style.cursor = 'pointer';
                analyzeBtn.textContent = originalText;
                alert('Please capture your profile first in Settings tab.');
                showTab('tab-settings');
                return;
            }

            updateStatus("Connecting...");
            
            // Check for cached analysis
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.url.includes('linkedin.com/')) {
                const cached = await checkCachedAnalysis(tab.url);
                if (cached) {
                    log("[Cache] Found cached analysis - user can use 'Regenerate Messages' button");
                    // Don't show regenerate button yet, wait until analysis completes
                }
            }
            
            if (!tab || !tab.url.includes('linkedin.com/')) {
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
                analyzeBtn.style.cursor = 'pointer';
                analyzeBtn.textContent = originalText;
                throw new Error('Go to LinkedIn Profile');
            }

            if (!(await ensureContentScript(tab.id))) throw new Error("Please refresh page");

            updateStatus("Scraping...");
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_PROFILE' });
            if (!response?.success) throw new Error("Scrape failed");

            updateStatus("Loading recent activity...");
            // Extract user handle from profile URL to construct recent activity URL
            const profileUrl = tab.url;
            const urlMatch = profileUrl.match(/linkedin\.com\/in\/([^\/]+)/);
            if (!urlMatch) throw new Error("Could not extract user handle from profile URL");
            
            const userHandle = urlMatch[1];
            const recentActivityUrl = `https://www.linkedin.com/in/${userHandle}/recent-activity/all/`;
            log(`[RecentActivity] Constructed URL: ${recentActivityUrl}`);
            
            // Open recent activity page in a new tab to avoid closing the popup
            const activityTab = await chrome.tabs.create({ 
                url: recentActivityUrl,
                active: false // Open in background
            });
            
            log(`[RecentActivity] Opened new tab: ${activityTab.id}`);
            
            // Wait for page to load
            await new Promise(resolve => setTimeout(resolve, 4000));
            
            // Wait for tab to be ready
            let tabReady = false;
            for (let i = 0; i < 10; i++) {
                try {
                    const currentTab = await chrome.tabs.get(activityTab.id);
                    if (currentTab.status === 'complete') {
                        tabReady = true;
                        break;
                    }
                } catch (e) {
                    log(`[RecentActivity] Waiting for tab... ${i + 1}/10`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            if (!tabReady) {
                log("[RecentActivity] ⚠ Tab not ready, proceeding anyway");
            }
            
            // Inject content script into the new tab
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: activityTab.id },
                    files: ['scripts/content.js']
                });
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for script to initialize
            } catch (e) {
                log(`[RecentActivity] ⚠ Could not inject script: ${e.message}`);
            }
            
            // Load posts from recent activity page
            let activity = { posts: [], likes: [], comments: [] };
            try {
                const activityResponse = await chrome.tabs.sendMessage(activityTab.id, { action: 'LOAD_RECENT_ACTIVITY' });
                if (activityResponse?.success && activityResponse.activity) {
                    activity = activityResponse.activity;
                    log(`[RecentActivity] ✓ Loaded ${activity.posts.length} posts`);
                } else {
                    log("[RecentActivity] ⚠ Failed to load activity, using empty activity");
                }
            } catch (e) {
                log(`[RecentActivity] ⚠ Error loading activity: ${e.message}`);
            }
            
            // Close the activity tab
            try {
                await chrome.tabs.remove(activityTab.id);
                log(`[RecentActivity] Closed activity tab`);
            } catch (e) {
                log(`[RecentActivity] ⚠ Could not close tab: ${e.message}`);
            }

            // Create prospect in database
            let prospectId = null;
            if (useBackend) {
                try {
                    const currentUserId = await getUserId();
                    const prospectData = {
                        linkedinProfileUrl: tab.url,
                        name: null, // Will be updated after extraction
                        headline: null,
                        company: null,
                        location: null
                    };
                    log(`[Prospect] Creating prospect for URL: ${tab.url}`);
                    const currentApiKey = await getApiKey();
                    const createResponse = await fetch(`${BACKEND_URL}/api/prospects`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': currentApiKey
                        },
                        body: JSON.stringify(prospectData)
                    });
                    
                    log(`[Prospect] Response status: ${createResponse.status}`);
                    
                    if (createResponse.ok) {
                        const result = await createResponse.json();
                        prospectId = result.prospectId;
                        log(`[Prospect] ✓ Created prospect with ID: ${prospectId}`);
                    } else {
                        const errorData = await createResponse.json().catch(() => ({ error: 'Unknown error' }));
                        log(`[Prospect] ✗ Failed to create prospect: ${errorData.error || 'Unknown error'}`);
                        log(`[Prospect] Response: ${JSON.stringify(errorData)}`);
                    }
                } catch (e) {
                    log(`[Prospect] ✗ Error creating prospect: ${e.message}`);
                    console.error('[Prospect] Full error:', e);
                    // Don't throw - continue with analysis even if prospect creation fails
                }
            }
            
            updateStatus("Extracting structured data...");
            log("[Extract] Prospect data length: " + response.data.length);
            log("[Extract] Activity: " + (activity ? `${activity.posts.length} posts` : 'none'));
            
            // Extract structured prospect data using GPT (including related profiles)
            const structuredProspect = await extractProspectWithGPT(
                response.data, 
                activity, 
                inputData.apiKey,
                response.relatedProfiles,
                prospectId,
                currentUserId
            );
            log("[Extract] Structured prospect: " + JSON.stringify(structuredProspect));
            log("[Extract] ✓ Structured prospect extracted: " + structuredProspect.name);
            log("[Extract]   Company: " + (structuredProspect.currentPosition?.company || 'N/A'));
            log("[Extract]   Interests: " + (structuredProspect.interests?.topics?.join(', ') || 'N/A'));
            log("[Extract]   Related Profiles: " + (structuredProspect.relatedProfiles?.length || 0) + " extracted");
            //log("[Extract]   Related Profiles: " + (structuredProspect.relatedProfiles?.length || 0) + " extracted");

            updateStatus("Summarizing posts...");
            // Extract post URLs from activity
            const postUrls = (activity?.posts || [])
                .filter(p => p.url)
                .map(p => p.url)
                .slice(0, 10); // Increased to 10 posts since we have more now
            
            log(`[PostSummary] Found ${postUrls.length} post URLs from recent activity`);
            
            // Summarize posts and extract interests (with URL fetching)
            const postSummary = await summarizePostsAndExtractInterests(
                activity?.posts || [],
                postUrls,
                tab.id,
                inputData.apiKey,
                prospectId,
                currentUserId
            );
            log("[PostSummary] Post analysis: " + (postSummary ? `Complete - ${postSummary.keyTopics?.length || 0} topics` : "Skipped"));
            log("[PostSummary] Post summary: " + JSON.stringify(postSummary));
            updateStatus("Researching companies...");
            // Research companies from prospect's experience
            const companyResearch = await researchCompanies(
                structuredProspect,
                inputData.offer,
                inputData.goal,
                inputData.icp,
                inputData.apiKey,
                prospectId
            );
            log("[Research] Company research: " + (companyResearch ? "Complete" : "Skipped"));

            updateStatus("Analyzing related profiles...");
            // Analyze related profiles if available (from structured prospect or response)
            let relevantProfiles = [];
            const profilesToAnalyze = structuredProspect?.relatedProfiles || response.relatedProfiles || [];
            
            if (profilesToAnalyze.length > 0) {
                log(`[RelatedProfiles] Analyzing ${profilesToAnalyze.length} related profiles (from ${structuredProspect?.relatedProfiles ? 'GPT extraction' : 'content script'})...`);
                relevantProfiles = await analyzeRelatedProfiles(
                    profilesToAnalyze,
                    inputData.goal,
                    inputData.icp,
                    inputData.offer,
                    inputData.apiKey,
                    prospectId
                );
                log(`[RelatedProfiles] ✓ Found ${relevantProfiles.length} relevant profiles`);
            } else {
                log("[RelatedProfiles] No related profiles found");
            }

            updateStatus("Analyzing...");
            log("[CallOpenAI] Structured sender: " + (senderStructured ? senderStructured.name : 'none'));
            log("[CallOpenAI] Sender preview: " + (senderStructured ? `${senderStructured.name} - ${senderStructured.headline || 'N/A'}` : "N/A"));
            
            const analysis = await callOpenAI(
                inputData, 
                senderStructured, 
                activity, 
                response.company,
                structuredProspect,
                companyResearch,
                postSummary,
                prospectId
            );

            // Store analysis results for reuse
            const currentProfileUrl = tab.url;
            const cacheKey = `analysis_${currentProfileUrl}`;
            await chrome.storage.local.set({
                [cacheKey]: {
                    profileUrl: currentProfileUrl,
                    structuredProspect: structuredProspect,
                    postSummary: postSummary,
                    companyResearch: companyResearch,
                    activity: activity,
                    company: response.company,
                    timestamp: new Date().toISOString()
                }
            });
            log(`[Cache] Stored analysis results for ${profileUrl}`);

            // Render the results
            renderResults(analysis, inputData.risk);
            
            // Render related profiles if available
            if (relevantProfiles && relevantProfiles.length > 0) {
                renderRelatedProfiles(relevantProfiles);
            } else {
                relatedProfilesContainer.innerHTML = '<p class="empty-state">No related profiles found or analyzed.</p>';
            }
            
            // Save analysis to backend if using backend credits
            if (useBackendCreditsCheckbox.checked) {
                try {
                    await saveAnalysisToBackend({
                        prospectId: prospectId,
                        sellerGoal: inputData.goal,
                        sellerOffer: inputData.offer,
                        sellerIcp: inputData.icp,
                        sellerProof: inputData.proof,
                        sellerRiskLevel: inputData.risk,
                        sellerOfferType: inputData.offerType,
                        analysisData: analysis
                    });
                    log("[SaveAnalysis] ✓ Analysis saved to backend");
                } catch (saveError) {
                    log(`[SaveAnalysis] ⚠ Failed to save analysis: ${saveError.message}`);
                    // Don't block the UI if save fails
                }
            }
            
            showTab('tab-results'); // Switch to results view
            updateStatus("Complete!");
            log("Analysis complete.");
            
            // Show regenerate button (analysis is now cached)
            regenerateBtn.classList.remove('hidden');

        } catch (e) {
            alert(e.message);
            updateStatus("Error");
            log(`Analysis error: ${e.message}`);
        } finally {
            // Re-enable button
            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = '1';
            analyzeBtn.style.cursor = 'pointer';
            analyzeBtn.textContent = originalText;
        }
    });

    // === AI Content Copilot ===
    
    // Analyze profile content for inspiration
    async function analyzeProfileContentForInspiration() {
        if (!analyzeProfileContentBtn) return;
        
        // Disable button
        analyzeProfileContentBtn.disabled = true;
        analyzeProfileContentBtn.style.opacity = '0.6';
        analyzeProfileContentBtn.style.cursor = 'not-allowed';
        const originalText = analyzeProfileContentBtn.textContent;
        analyzeProfileContentBtn.textContent = 'Analyzing...';
        
        if (contentAnalysisStatusBadge) {
            contentAnalysisStatusBadge.textContent = 'Analyzing...';
        }
        
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab || !tab.url.includes('linkedin.com/in/')) {
                alert('Please navigate to a LinkedIn profile page first');
                return;
            }
            
            // Extract user handle from profile URL to construct recent activity URL
            const profileUrl = tab.url;
            const urlMatch = profileUrl.match(/linkedin\.com\/in\/([^\/]+)/);
            if (!urlMatch) {
                throw new Error("Could not extract user handle from profile URL");
            }
            
            const userHandle = urlMatch[1];
            const recentActivityUrl = `https://www.linkedin.com/in/${userHandle}/recent-activity/all/`;
            log(`[ContentAnalysis] Constructed activity URL: ${recentActivityUrl}`);
            
            // Get profile info first
            if (!(await ensureContentScript(tab.id))) {
                throw new Error("Connection failed. Please refresh the page.");
            }
            
            const profileResponse = await chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_PROFILE' });
            if (!profileResponse?.success) {
                throw new Error("Failed to scrape profile");
            }
            
            // Extract profile name from response or fallback
            let profileName = profileResponse.profileName || 'Unknown Profile';
            
            // Fallback: try to extract from profile text if not provided
            if (!profileName || profileName === 'Unknown Profile') {
                try {
                    const profileText = profileResponse.data || '';
                    const lines = profileText.split('\n').filter(line => line.trim().length > 0);
                    if (lines.length > 0) {
                        profileName = lines[0].trim()
                            .replace(/\s*View profile.*$/i, '')
                            .replace(/\s*LinkedIn.*$/i, '')
                            .trim()
                            .substring(0, 100);
                    }
                    
                    // Final fallback: extract from URL
                    if (!profileName || profileName.length < 3) {
                        const urlMatch = tab.url.match(/linkedin\.com\/in\/([^\/\?]+)/);
                        if (urlMatch) {
                            profileName = urlMatch[1]
                                .split('-')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
                        }
                    }
                } catch (e) {
                    log(`[ContentAnalysis] Could not extract profile name: ${e.message}`);
                }
            }
            
            log(`[ContentAnalysis] Profile name: ${profileName}`);
            
            // Open recent activity page in a new tab
            if (contentAnalysisStatusBadge) {
                contentAnalysisStatusBadge.textContent = 'Loading posts...';
            }
            const activityTab = await chrome.tabs.create({ 
                url: recentActivityUrl,
                active: false
            });
            
            log(`[ContentAnalysis] Opened activity tab: ${activityTab.id}`);
            
            // Wait for page to load
            await new Promise(resolve => setTimeout(resolve, 4000));
            
            // Wait for tab to be ready
            let tabReady = false;
            for (let i = 0; i < 10; i++) {
                try {
                    const tabInfo = await chrome.tabs.get(activityTab.id);
                    if (tabInfo.status === 'complete') {
                        tabReady = true;
                        break;
                    }
                } catch (e) {
                    log(`[ContentAnalysis] Waiting for tab... ${i + 1}/10`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            if (!tabReady) {
                log("[ContentAnalysis] ⚠ Tab not ready, proceeding anyway");
            }
            
            // Inject content script into the new tab
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: activityTab.id },
                    files: ['scripts/content.js']
                });
                log(`[ContentAnalysis] Injected content script`);
            } catch (e) {
                log(`[ContentAnalysis] ⚠ Could not inject script: ${e.message}`);
            }
            
            // Load posts from recent activity page with engagement metrics
            let activity = { posts: [], likes: [], comments: [] };
            try {
                const activityResponse = await chrome.tabs.sendMessage(activityTab.id, { action: 'LOAD_RECENT_ACTIVITY' });
                if (activityResponse?.success && activityResponse.activity) {
                    activity = activityResponse.activity;
                    log(`[ContentAnalysis] ✓ Loaded ${activity.posts.length} posts with engagement metrics`);
                } else {
                    log("[ContentAnalysis] ⚠ Failed to load activity, trying fallback");
                    // Fallback: try scraping from current tab
                    const fallbackResponse = await chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_PROFILE' });
                    if (fallbackResponse?.activity) {
                        activity = fallbackResponse.activity;
                    }
                }
            } catch (e) {
                log(`[ContentAnalysis] ⚠ Error loading activity: ${e.message}`);
                // Fallback: try scraping from current tab
                const fallbackResponse = await chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_PROFILE' });
                if (fallbackResponse?.activity) {
                    activity = fallbackResponse.activity;
                }
            }
            
            // Close the activity tab
            try {
                await chrome.tabs.remove(activityTab.id);
                log(`[ContentAnalysis] Closed activity tab`);
            } catch (e) {
                log(`[ContentAnalysis] ⚠ Could not close tab: ${e.message}`);
            }
            
            if (activity.posts.length === 0) {
                alert('No posts found on this profile. Try a profile with recent activity.');
                return;
            }
            
            // Get user context for better analysis
            const stored = await chrome.storage.local.get([
                'sender_profile_structured',
                'user_goal',
                'icp_definition',
                'offer_details'
            ]);
            
            const useBackend = useBackendCreditsCheckbox.checked;
            const apiKey = useBackend ? null : apiKeyInput.value.trim();
            
            if (!useBackend && !apiKey) {
                alert('Please configure your API key in Settings or enable Backend Credits');
                return;
            }
            
            // Filter and prepare posts with engagement metrics for analysis
            const postsWithEngagement = activity.posts
                .map((post, i) => {
                    const engagement = post.engagement || { likes: 0, comments: 0, shares: 0 };
                    const postText = (post.text || post.fullText || '').trim();
                    
                    return {
                        index: i + 1,
                        text: postText,
                        engagement: engagement,
                        url: post.url || '',
                        timestamp: post.timestamp || ''
                    };
                })
                .filter(post => {
                    // Skip very short posts (2-3 lines or less than 100 characters)
                    const lineCount = (post.text.match(/\n/g) || []).length + 1;
                    if (lineCount <= 3 || post.text.length < 100) {
                        log(`[ContentAnalysis] Skipping short post: ${lineCount} lines, ${post.text.length} chars`);
                        return false;
                    }
                    
                    // Skip hiring/job posts
                    const hiringKeywords = [
                        'hiring', 'we are hiring', 'looking for', 'job opening', 'open position',
                        'join our team', 'career opportunity', 'apply now', 'recruiting',
                        'job posting', 'open role', 'now hiring', 'position available'
                    ];
                    const lowerText = post.text.toLowerCase();
                    if (hiringKeywords.some(keyword => lowerText.includes(keyword))) {
                        log(`[ContentAnalysis] Skipping hiring post`);
                        return false;
                    }
                    
                    return true;
                });
            
            if (postsWithEngagement.length === 0) {
                alert('No valuable posts found after filtering. The profile may only have short posts or hiring announcements. Try a profile with more substantial content.');
                return;
            }
            
            log(`[ContentAnalysis] Filtered to ${postsWithEngagement.length} valuable posts (from ${activity.posts.length} total)`);
            
            // Sort by engagement (likes + comments) to prioritize high-performing posts
            postsWithEngagement.sort((a, b) => {
                const aTotal = (a.engagement.likes || 0) + (a.engagement.comments || 0);
                const bTotal = (b.engagement.likes || 0) + (b.engagement.comments || 0);
                return bTotal - aTotal;
            });
            
            // Analyze posts to extract style, topics, patterns, and insights
            const postsText = postsWithEngagement.slice(0, 20).map((post, i) => 
                `Post ${post.index} (Likes: ${post.engagement.likes || 0}, Comments: ${post.engagement.comments || 0}, Shares: ${post.engagement.shares || 0}):
${post.text.substring(0, 800)}`
            ).join('\n\n---\n\n');
            
            const analysisPrompt = `Analyze these LinkedIn posts from a profile to extract comprehensive content insights including writing style, topics, patterns, and engagement factors.

POSTS FROM PROFILE (sorted by engagement):
${postsText}

${stored.user_goal ? `USER'S GOAL: ${stored.user_goal}` : ''}
${stored.icp_definition ? `ICP: ${stored.icp_definition}` : ''}

Extract and return ONLY a JSON object with this structure:
{
  "topics": ["topic1", "topic2", "topic3", ...],
  "contentThemes": ["theme1", "theme2", ...],
  "writingStyle": {
    "tone": "professional/conversational/educational/etc",
    "structure": "how posts are structured",
    "hookStyle": "how posts start/engage",
    "length": "typical post length",
    "formatting": "use of line breaks, emojis, lists, etc"
  },
  "contentPatterns": ["pattern1", "pattern2", ...],
  "engagementInsights": {
    "highPerformingTopics": ["topics that get most engagement"],
    "effectiveHooks": ["hook styles that work"],
    "engagementDrivers": ["what drives likes/comments"]
  },
  "examplePosts": [
    {
      "topic": "topic name",
      "excerpt": "short excerpt from post",
      "engagement": {"likes": 0, "comments": 0, "shares": 0},
      "whyItWorks": "why this post is effective",
      "keyElements": ["element1", "element2"]
    }
  ],
  "suggestions": [
    "suggestion1 for creating similar content",
    "suggestion2",
    ...
  ]
}

Focus on:
- Writing style and tone patterns
- Content structure and formatting
- Topics that get high engagement
- Effective hooks and opening styles
- What drives comments vs likes
- Recurring themes and patterns
- Adaptable insights for content creation`;

            log("[ContentAnalysis] Analyzing profile content...");
            
            const requestBody = {
                model: "gpt-5.2",
                messages: [
                    { role: "system", content: "You are a content strategy expert. Analyze LinkedIn posts to extract topics, themes, and content ideas. Return valid JSON only." },
                    { role: "user", content: analysisPrompt }
                ],
                temperature: 0.5,
                response_format: { type: "json_object" }
            };
            
            const currentUserId = await getUserId();
            const analysisResponse = await callGPTWithTracking(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                },
                'gpt-5.2',
                apiKey,
                'content_analysis',
                'Analyze profile content for inspiration',
                null,
                currentUserId
            );
            
            if (!analysisResponse.ok) {
                const err = await analysisResponse.json();
                throw new Error(err.error?.message || 'Content analysis failed');
            }
            
            const analysisData = await analysisResponse.json();
            const analysisContent = analysisData.choices?.[0]?.message?.content || analysisData.response?.choices?.[0]?.message?.content;
            const parsed = JSON.parse(analysisContent);
            
            // Store analyzed content references (enhanced)
            analyzedContentReferences = {
                topics: parsed.topics || [],
                themes: parsed.contentThemes || [],
                patterns: parsed.contentPatterns || [],
                writingStyle: parsed.writingStyle || {},
                engagementInsights: parsed.engagementInsights || {},
                examples: parsed.examplePosts || [],
                suggestions: parsed.suggestions || [],
                profileUrl: tab.url,
                profileName: profileName,
                postsAnalyzed: activity.posts.length,
                timestamp: new Date().toISOString(),
                fullAnalysis: parsed // Store complete analysis
            };
            
            // Save to database (always save, regardless of backend credits usage)
            try {
                const currentApiKey = await getApiKey();
                if (!currentApiKey) {
                    log("[ContentAnalysis] ⚠ No API key available, skipping database save");
                } else {
                    const analysisPayload = {
                        profileUrl: tab.url,
                        profileName: profileName,
                        analysisType: 'content_inspiration',
                        analysisData: {
                            topics: parsed.topics || [],
                            themes: parsed.contentThemes || [],
                            writingStyle: parsed.writingStyle || {},
                            patterns: parsed.contentPatterns || [],
                            engagementInsights: parsed.engagementInsights || {},
                            examplePosts: parsed.examplePosts || [],
                            suggestions: parsed.suggestions || [],
                            postsAnalyzed: postsWithEngagement.length,
                            totalPostsFound: activity.posts.length,
                            postsWithEngagement: postsWithEngagement.slice(0, 20)
                        }
                    };
                    
                    const saveResponse = await fetch(`${BACKEND_URL}/api/content-analyses`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': currentApiKey
                        },
                        body: JSON.stringify(analysisPayload)
                    });
                    
                    if (saveResponse.ok) {
                        const result = await saveResponse.json();
                        analyzedContentReferences.analysisId = result.analysisId;
                        log("[ContentAnalysis] ✓ Analysis saved to database with ID: " + result.analysisId);
                        
                        // Reload stored analyses if we're on the inspire tab
                        if (document.getElementById('tab-inspire') && !document.getElementById('tab-inspire').classList.contains('hidden')) {
                            loadStoredAnalyses();
                        }
                    } else {
                        const errorData = await saveResponse.json().catch(() => ({}));
                        log("[ContentAnalysis] ⚠ Failed to save to database: " + (errorData.error || saveResponse.statusText));
                    }
                }
            } catch (saveError) {
                log(`[ContentAnalysis] ⚠ Error saving to database: ${saveError.message}`);
            }
            
            // Display results
            if (analyzedTopicsList) {
                let topicsHtml = '<div style="margin-bottom: 12px;"><strong>Topics Found:</strong></div><div style="display: flex; flex-wrap: wrap; gap: 6px;">';
                (parsed.topics || []).forEach(topic => {
                    topicsHtml += `<span class="topic-tag">${topic}</span>`;
                });
                topicsHtml += '</div>';
                
                // Add writing style info
                if (parsed.writingStyle) {
                    topicsHtml += '<div style="margin-top: 12px; padding: 8px; background: var(--input-bg); border-radius: 4px; font-size: 12px;">';
                    topicsHtml += '<strong>Writing Style:</strong><br>';
                    if (parsed.writingStyle.tone) topicsHtml += `Tone: ${parsed.writingStyle.tone}<br>`;
                    if (parsed.writingStyle.structure) topicsHtml += `Structure: ${parsed.writingStyle.structure}<br>`;
                    if (parsed.writingStyle.hookStyle) topicsHtml += `Hook Style: ${parsed.writingStyle.hookStyle}`;
                    topicsHtml += '</div>';
                }
                
                // Add engagement insights
                if (parsed.engagementInsights) {
                    topicsHtml += '<div style="margin-top: 12px; padding: 8px; background: var(--input-bg); border-radius: 4px; font-size: 12px;">';
                    topicsHtml += '<strong>Engagement Insights:</strong><br>';
                    if (parsed.engagementInsights.highPerformingTopics && parsed.engagementInsights.highPerformingTopics.length > 0) {
                        topicsHtml += `High-performing topics: ${parsed.engagementInsights.highPerformingTopics.join(', ')}<br>`;
                    }
                    if (parsed.engagementInsights.effectiveHooks && parsed.engagementInsights.effectiveHooks.length > 0) {
                        topicsHtml += `Effective hooks: ${parsed.engagementInsights.effectiveHooks.join(', ')}`;
                    }
                    topicsHtml += '</div>';
                }
                
                analyzedTopicsList.innerHTML = topicsHtml;
            }
            
            if (analyzedContentExamples) {
                let examplesHtml = '<div style="margin-top: 12px;"><strong>Example Posts (with Engagement):</strong></div>';
                (parsed.examplePosts || []).slice(0, 5).forEach((example, i) => {
                    const engagement = example.engagement || {};
                    const totalEngagement = (engagement.likes || 0) + (engagement.comments || 0) + (engagement.shares || 0);
                    examplesHtml += `
                        <div style="margin-top: 8px; padding: 8px; background: var(--input-bg); border-radius: 4px; font-size: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
                                <div style="font-weight: 600;">${example.topic || 'Topic'}</div>
                                <div style="font-size: 11px; color: var(--accent-color);">
                                    👍 ${engagement.likes || 0} | 💬 ${engagement.comments || 0} | 🔄 ${engagement.shares || 0}
                                </div>
                            </div>
                            <div style="color: var(--text-secondary); margin-bottom: 4px;">${example.excerpt || ''}</div>
                            <div style="font-size: 11px; color: var(--accent-color); margin-bottom: 4px;">${example.whyItWorks || ''}</div>
                            ${example.keyElements && example.keyElements.length > 0 ? `<div style="font-size: 10px; color: var(--text-secondary);">Key elements: ${example.keyElements.join(', ')}</div>` : ''}
                        </div>
                    `;
                });
                analyzedContentExamples.innerHTML = examplesHtml;
            }
            
            // Show results
            if (contentAnalysisResults) {
                contentAnalysisResults.classList.remove('hidden');
            }
            
            if (contentAnalysisStatusBadge) {
                contentAnalysisStatusBadge.textContent = 'Complete!';
            }
            
            log("[ContentAnalysis] ✓ Analysis complete");
            
        } catch (e) {
            alert(e.message);
            log(`[ContentAnalysis] Error: ${e.message}`);
            if (contentAnalysisStatusBadge) {
                contentAnalysisStatusBadge.textContent = 'Error';
            }
        } finally {
            // Re-enable button
            analyzeProfileContentBtn.disabled = false;
            analyzeProfileContentBtn.style.opacity = '1';
            analyzeProfileContentBtn.style.cursor = 'pointer';
            analyzeProfileContentBtn.textContent = originalText;
        }
    }
    
    // Suggest topics based on profile and ICP
    async function suggestContentTopics() {
        if (!suggestTopicsBtn) return;
        
        // Disable button
        suggestTopicsBtn.disabled = true;
        suggestTopicsBtn.style.opacity = '0.6';
        const originalText = suggestTopicsBtn.textContent;
        suggestTopicsBtn.textContent = 'Suggesting...';
        
        try {
            const stored = await chrome.storage.local.get([
                'sender_profile_structured',
                'user_goal',
                'icp_definition',
                'offer_details',
                'content_library',
                'sender_content_context'
            ]);
            
            const useBackend = useBackendCreditsCheckbox.checked;
            const apiKey = useBackend ? null : apiKeyInput.value.trim();
            
            if (!useBackend && !apiKey) {
                alert('Please configure your API key in Settings or enable Backend Credits');
                return;
            }
            
            // Build context for topic suggestions with enhanced criteria
            let contextText = '';
            if (stored.user_goal) contextText += `Goal: ${stored.user_goal}\n`;
            if (stored.icp_definition) contextText += `ICP: ${stored.icp_definition}\n`;
            if (stored.offer_details) contextText += `Offer: ${stored.offer_details}\n`;
            
            // Enhanced profile context with company and industry
            if (stored.sender_profile_structured) {
                const profile = stored.sender_profile_structured;
                contextText += `Profile: ${profile.name || ''} - ${profile.headline || ''}\n`;
                
                // Add current company if available
                if (profile.currentCompany) {
                    contextText += `Current Company: ${profile.currentCompany}\n`;
                }
                
                // Add industry information
                if (profile.industry) {
                    contextText += `Industry: ${profile.industry}\n`;
                }
                
                // Add experience and skills for personal interests
                if (profile.experience && profile.experience.length > 0) {
                    const recentExp = profile.experience.slice(0, 3).map(exp => 
                        `${exp.title || ''} at ${exp.company || ''}`
                    ).join(', ');
                    if (recentExp) {
                        contextText += `Recent Experience: ${recentExp}\n`;
                    }
                }
                
                if (profile.skills && profile.skills.length > 0) {
                    const topSkills = profile.skills.slice(0, 10).join(', ');
                    contextText += `Skills/Expertise: ${topSkills}\n`;
                }
            }
            
            // Include user's custom topic suggestions if available
            const customTopics = await chrome.storage.local.get('custom_topic_suggestions');
            if (customTopics.custom_topic_suggestions && customTopics.custom_topic_suggestions.length > 0) {
                contextText += `\nUser's Custom Topic Ideas: ${customTopics.custom_topic_suggestions.join(', ')}\n`;
            }
            
            // Include analyzed content references if available
            if (analyzedContentReferences) {
                contextText += `\nRecently analyzed profile topics: ${analyzedContentReferences.topics.join(', ')}\n`;
            }
            
            // Include sender's own content context if available
            if (stored.sender_content_context && stored.sender_content_context.posts && stored.sender_content_context.posts.length > 0) {
                const ownPosts = stored.sender_content_context.posts
                    .map(p => p.text)
                    .filter(t => t)
                    .slice(0, 5)
                    .join('\n---\n');
                contextText += `\nSender's own recent posts:\n${ownPosts}\n`;
            }
            
            // Include previous content library topics
            if (stored.content_library && stored.content_library.length > 0) {
                const previousTopics = stored.content_library
                    .map(item => item.topic)
                    .filter(t => t)
                    .slice(0, 10)
                    .join(', ');
                if (previousTopics) {
                    contextText += `Previous content topics: ${previousTopics}\n`;
                }
            }
            
            const suggestionPrompt = `Suggest 10-15 LinkedIn content topics for a sales professional.

CONTEXT:
${contextText || 'No specific context provided'}

TOPIC SUGGESTION CRITERIA (prioritize in this order):
1. **Company-Related Topics** (if current company is provided):
   - Industry trends affecting the company
   - Company-specific challenges and solutions
   - How the company's products/services solve problems
   - Company culture and values
   - Industry leadership and positioning

2. **Industry-Related Topics** (if industry is provided):
   - Industry trends and developments
   - Common challenges in the industry
   - Best practices and frameworks
   - Industry-specific case studies
   - Future of the industry

3. **Personal Expertise Topics** (based on experience and skills):
   - Areas where the sender has deep expertise
   - Lessons learned from experience
   - Personal insights and frameworks
   - Success stories and case studies
   - Common mistakes and how to avoid them

4. **ICP-Focused Topics** (if ICP is defined):
   - Problems the ICP faces
   - Solutions relevant to the ICP
   - Content that attracts the ICP
   - Industry-specific insights for the ICP

5. **Goal-Aligned Topics** (based on user's goals):
   - Topics that support the user's business goals
   - Content that positions for the offer/service
   - Thought leadership in relevant areas

6. **Engagement-Focused Topics**:
   - Topics that generate discussion
   - Controversial but valuable perspectives
   - Timely and relevant content
   - Personal stories that resonate

${analyzedContentReferences ? '7. **Style-Inspired Topics**: Similar in style and approach to recently analyzed content, but adapted to the sender\'s context' : ''}

${customTopics.custom_topic_suggestions && customTopics.custom_topic_suggestions.length > 0 ? '8. **User Custom Ideas**: Consider and expand upon the user\'s custom topic suggestions' : ''}

Generate topics that:
- Build credibility and expertise
- Attract the ICP (if specified)
- Align with the user's goals and offer
- Are engaging and shareable
- Position the sender as a thought leader
- Address buyer problems and challenges
- Leverage company, industry, and personal expertise context

Return ONLY a JSON object:
{
  "topics": [
    {
      "topic": "Topic title",
      "description": "Why this topic works",
      "angle": "Specific angle or approach"
    }
  ]
}`;

            log("[TopicSuggest] Generating topic suggestions...");
            log("[TopicSuggest] Prompt: " + suggestionPrompt);
            
            const requestBody = {
                model: "gpt-5.2",
                messages: [
                    { role: "system", content: "You are a LinkedIn content strategist. Suggest engaging, relevant content topics. Return valid JSON only." },
                    { role: "user", content: suggestionPrompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            };
            
            const currentUserId = await getUserId();
            const response = await callGPTWithTracking(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                },
                'gpt-5.2',
                apiKey,
                'topic_suggestion',
                'Suggest content topics',
                null,
                currentUserId
            );
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Topic suggestion failed');
            }
            
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;
            const parsed = JSON.parse(content);
            
            // Display suggested topics
            if (suggestedTopicsContainer) {
                const topics = parsed.topics || [];
                let html = `
                    <div class="suggested-topics-header">
                        <h4>💡 Suggested Topics (${topics.length})</h4>
                        <p class="suggested-topics-subtitle">Click "Use" to select a topic, or click anywhere on the card to use it</p>
                    </div>
                    <div class="suggested-topics-grid">
                `;
                
                topics.forEach((topicObj, index) => {
                    const topic = typeof topicObj === 'string' ? topicObj : topicObj.topic;
                    const description = typeof topicObj === 'object' ? topicObj.description : null;
                    const angle = typeof topicObj === 'object' ? topicObj.angle : null;
                    
                    html += `
                        <div class="suggested-topic-card" data-topic="${topic}" data-index="${index}">
                            <div class="suggested-topic-number">${index + 1}</div>
                            <div class="suggested-topic-content">
                                <h5 class="suggested-topic-title">${topic}</h5>
                                ${description ? `<p class="suggested-topic-description">${description}</p>` : ''}
                                ${angle ? `<div class="suggested-topic-angle">📌 ${angle}</div>` : ''}
                            </div>
                            <button class="use-topic-btn" data-topic="${topic}" title="Use this topic">
                                <span>Use</span>
                                <span class="use-icon">→</span>
                            </button>
                        </div>
                    `;
                });
                
                html += '</div>';
                suggestedTopicsContainer.innerHTML = html;
                suggestedTopicsContainer.classList.remove('hidden');
                
                // Add event listeners for Use buttons
                suggestedTopicsContainer.querySelectorAll('.use-topic-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const topic = e.target.closest('.use-topic-btn').dataset.topic;
                        if (contentTopicInput) {
                            contentTopicInput.value = topic;
                            // Scroll to input field
                            contentTopicInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // Highlight the input field
                            contentTopicInput.classList.add('topic-selected');
                            setTimeout(() => {
                                contentTopicInput.classList.remove('topic-selected');
                            }, 2000);
                            // Visual feedback on button
                            btn.classList.add('used');
                            setTimeout(() => {
                                btn.classList.remove('used');
                            }, 1000);
                        }
                    });
                });
                
                // Make entire card clickable
                suggestedTopicsContainer.querySelectorAll('.suggested-topic-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        // Don't trigger if clicking the Use button
                        if (e.target.closest('.use-topic-btn')) return;
                        
                        const topic = card.dataset.topic;
                        if (contentTopicInput) {
                            contentTopicInput.value = topic;
                            // Scroll to input field
                            contentTopicInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // Highlight the input field
                            contentTopicInput.classList.add('topic-selected');
                            setTimeout(() => {
                                contentTopicInput.classList.remove('topic-selected');
                            }, 2000);
                            // Visual feedback on card
                            card.classList.add('selected');
                            setTimeout(() => {
                                card.classList.remove('selected');
                            }, 1000);
                        }
                    });
                });
            }
            
            log("[TopicSuggest] ✓ Topics suggested");
            
        } catch (e) {
            alert(e.message);
            log(`[TopicSuggest] Error: ${e.message}`);
        } finally {
            // Re-enable button
            suggestTopicsBtn.disabled = false;
            suggestTopicsBtn.style.opacity = '1';
            suggestTopicsBtn.textContent = originalText;
        }
    }
    
    async function generateLinkedInContent() {
        if (!generateContentBtn) return;
        
        // Disable button
        generateContentBtn.disabled = true;
        generateContentBtn.style.opacity = '0.6';
        generateContentBtn.style.cursor = 'not-allowed';
        const originalText = generateContentBtn.textContent;
        generateContentBtn.textContent = 'Generating...';
        
        if (contentStatusBadge) {
            contentStatusBadge.textContent = 'Generating...';
        }
        
        try {
            // Get user context - use Content Copilot settings instead of Marketing settings
            const stored = await chrome.storage.local.get([
                'sender_profile_structured',
                'content_goal',
                'content_icp',
                'content_expertise',
                'content_proof_points',
                // Fallback to marketing settings if content settings not available
                'user_goal',
                'icp_definition',
                'offer_details',
                'proof_points'
            ]);
            
            const senderStructured = stored.sender_profile_structured;
            // Use content-specific settings, fallback to marketing settings if not set
            const userGoal = stored.content_goal || stored.user_goal || '';
            const icpDefinition = stored.content_icp || stored.icp_definition || '';
            const offerDetails = stored.content_expertise || stored.offer_details || '';
            const proofPoints = stored.content_proof_points || stored.proof_points || '';
            
            // Get content parameters
            const contentType = contentTypeSelect?.value || 'post';
            const contentTopic = contentTopicInput?.value.trim() || '';
            const contentTone = contentToneSelect?.value || 'conversational';
            const contentCTA = contentCTAInput?.value.trim() || '';
            const includePersonalStory = includePersonalStorySelect?.value || 'auto';
            
            // Check if using backend credits
            const useBackend = useBackendCreditsCheckbox.checked;
            const apiKey = useBackend ? null : apiKeyInput.value.trim();
            
            if (!useBackend && !apiKey) {
                alert('Please configure your API key in Settings or enable Backend Credits');
                return;
            }
            
            // Build prompt for content generation
            const prompt = `You are an expert LinkedIn content creator helping a sales professional build their personal brand and improve outreach performance.

CONTEXT:
- User's Goal: ${userGoal || 'Not specified'}
- ICP Definition: ${icpDefinition || 'Not specified'}
- Offer/Service: ${offerDetails || 'Not specified'}
- Proof Points: ${proofPoints || 'Not specified'}

${senderStructured ? `SENDER PROFILE:
${JSON.stringify(senderStructured, null, 2)}
Use this profile to:
- Reference relevant experience and expertise
- Build credibility through background
- Create authentic personal stories when appropriate
- Align content with sender's professional positioning
` : 'Sender profile not captured yet. Create general but valuable content.'}

CONTENT REQUIREMENTS:
- Content Type: ${contentType}
- Topic/Focus: ${contentTopic || 'AI should suggest based on sender profile, ICP, and goals'}
- Tone: ${contentTone}
- Include Personal Story: ${includePersonalStory}
- Call-to-Action: ${contentCTA || 'AI should suggest appropriate CTA'}

${analyzedContentReferences ? `CONTENT INSPIRATION FROM ANALYZED PROFILE:
Topics: ${analyzedContentReferences.topics.join(', ')}
Themes: ${analyzedContentReferences.themes.join(', ')}
Patterns: ${analyzedContentReferences.patterns.join(', ')}
Example Posts:
${analyzedContentReferences.examples.map((ex, i) => `${i + 1}. ${ex.topic}: ${ex.excerpt}`).join('\n')}
Suggestions: ${analyzedContentReferences.suggestions.join(', ')}

Use these as inspiration but create original content. Adapt the successful patterns and topics to fit the sender's context.` : ''}

CONTENT GUIDELINES:
1. Create content that positions the sender as an expert in their field
2. Address problems and challenges relevant to the ICP
3. Provide value (insights, tips, frameworks, case studies)
4. Make it engaging and shareable
5. Include clear positioning ("what do you do" in 5 seconds)
6. Signal expertise through specific examples or data
7. Align with buyer problems from ICP definition
8. Use appropriate tone (${contentTone})
9. ${includePersonalStory === 'yes' ? 'Include relevant personal experience or story' : includePersonalStory === 'no' ? 'Keep it general, avoid personal stories' : 'AI decides if personal story adds value'}
10. ${contentCTA ? `Include this CTA: ${contentCTA}` : 'Include appropriate call-to-action'}

CONTENT TYPE SPECIFICS:
${contentType === 'post' ? '- LinkedIn Post: 1300-3000 characters, engaging hook, valuable insights, clear CTA' : ''}
${contentType === 'article' ? '- LinkedIn Article: 2000-5000 words, comprehensive, in-depth, structured with headings' : ''}
${contentType === 'carousel' ? '- Carousel Post: 5-10 slides with concise text per slide, visual-friendly format' : ''}
${contentType === 'video-script' ? '- Video Script: 2-5 minutes speaking time, engaging opening, clear structure, strong close' : ''}
${contentType === 'poll' ? '- Poll with Context: Engaging poll question with supporting context post explaining why it matters' : ''}

Return ONLY a JSON object with this structure:
{
  "content": "The full generated content text",
  "title": "Suggested title/headline (if applicable)",
  "strategy": "Why this content works for the sender's goals and ICP",
  "tips": ["Tip 1 for posting", "Tip 2 for engagement", "Tip 3 for optimization"],
  "hashtags": ["#relevant", "#hashtags", "#suggested"],
  "postingTime": "Best time to post (if applicable)"
}`;

            log("[ContentGen] Generating content...");
            log(`[ContentGen] Type: ${contentType}, Tone: ${contentTone}, Topic: ${contentTopic || 'AI-suggested'}`);
            
            const requestBody = {
                model: "gpt-5.2",
                messages: [
                    { role: "system", content: "You are an expert LinkedIn content creator. Generate high-quality, engaging LinkedIn content that builds personal brand and improves outreach performance. Return valid JSON only." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            };
            
            const currentUserId = await getUserId();
            const response = await callGPTWithTracking(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                },
                'gpt-4o-mini',
                apiKey,
                'content_generation',
                `Generate ${contentType} content for LinkedIn`,
                null,
                currentUserId
            );
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Content generation failed');
            }
            
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || data.response?.choices?.[0]?.message?.content;
            const parsed = JSON.parse(content);
            
            // Display generated content
            if (generatedContentText) {
                generatedContentText.textContent = parsed.content || parsed;
            }
            
            // Update metadata
            const textContent = parsed.content || parsed;
            const charCount = textContent.length;
            const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
            const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
            
            if (contentCharCount) contentCharCount.textContent = charCount.toLocaleString();
            if (contentWordCount) contentWordCount.textContent = wordCount.toLocaleString();
            if (contentReadTime) contentReadTime.textContent = `${readTime} min`;
            
            // Display strategy and tips
            if (contentStrategyTips) {
                let tipsHtml = '';
                if (parsed.strategy) {
                    tipsHtml += `<p><strong>Strategy:</strong> ${parsed.strategy}</p>`;
                }
                if (parsed.tips && Array.isArray(parsed.tips)) {
                    tipsHtml += '<ul>';
                    parsed.tips.forEach(tip => {
                        tipsHtml += `<li>${tip}</li>`;
                    });
                    tipsHtml += '</ul>';
                }
                if (parsed.hashtags && Array.isArray(parsed.hashtags)) {
                    tipsHtml += `<p><strong>Suggested Hashtags:</strong> ${parsed.hashtags.join(' ')}</p>`;
                }
                if (parsed.postingTime) {
                    tipsHtml += `<p><strong>Best Posting Time:</strong> ${parsed.postingTime}</p>`;
                }
                contentStrategyTips.innerHTML = tipsHtml || '<p>No additional tips available.</p>';
            }
            
            // Show content section
            if (generatedContentSection) {
                generatedContentSection.classList.remove('hidden');
            }
            
            // Save to library
            await saveContentToLibrary({
                type: contentType,
                topic: contentTopic,
                tone: contentTone,
                content: textContent,
                title: parsed.title || '',
                strategy: parsed.strategy || '',
                tips: parsed.tips || [],
                hashtags: parsed.hashtags || [],
                timestamp: new Date().toISOString()
            });
            
            // Load library
            await loadContentLibrary();
            
            if (contentStatusBadge) {
                contentStatusBadge.textContent = 'Complete!';
            }
            
            log("[ContentGen] ✓ Content generated successfully");
            
        } catch (e) {
            alert(e.message);
            log(`[ContentGen] Error: ${e.message}`);
            if (contentStatusBadge) {
                contentStatusBadge.textContent = 'Error';
            }
        } finally {
            // Re-enable button
            generateContentBtn.disabled = false;
            generateContentBtn.style.opacity = '1';
            generateContentBtn.style.cursor = 'pointer';
            generateContentBtn.textContent = originalText;
        }
    }
    
    // Save content to library (both local storage and database)
    async function saveContentToLibrary(contentData) {
        try {
            // Save to local storage
            const stored = await chrome.storage.local.get('content_library');
            const library = stored.content_library || [];
            library.unshift(contentData); // Add to beginning
            // Keep only last 50 items
            const limitedLibrary = library.slice(0, 50);
            await chrome.storage.local.set({ content_library: limitedLibrary });
            log("[ContentLib] Content saved to local library");
            
            // Save to database
            try {
                const currentApiKey = await getApiKey();
                if (currentApiKey) {
                    const contentPayload = {
                        contentType: contentData.type,
                        topic: contentData.topic || '',
                        tone: contentData.tone || '',
                        content: contentData.content,
                        title: contentData.title || '',
                        strategy: contentData.strategy || '',
                        tips: contentData.tips || [],
                        hashtags: contentData.hashtags || [],
                        metadata: {
                            charCount: contentData.content.length,
                            wordCount: contentData.content.split(/\s+/).filter(w => w.length > 0).length,
                            readTime: Math.ceil(contentData.content.split(/\s+/).filter(w => w.length > 0).length / 200)
                        }
                    };
                    
                    const saveResponse = await fetch(`${BACKEND_URL}/api/generated-content`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': currentApiKey
                        },
                        body: JSON.stringify(contentPayload)
                    });
                    
                    if (saveResponse.ok) {
                        const result = await saveResponse.json();
                        log("[ContentLib] ✓ Content saved to database with ID: " + result.contentId);
                    } else {
                        const errorData = await saveResponse.json().catch(() => ({}));
                        log("[ContentLib] ⚠ Failed to save to database: " + (errorData.error || saveResponse.statusText));
                    }
                } else {
                    log("[ContentLib] ⚠ No API key available, skipping database save");
                }
            } catch (dbError) {
                log(`[ContentLib] ⚠ Error saving to database: ${dbError.message}`);
            }
        } catch (error) {
            log(`[ContentLib] Error saving: ${error.message}`);
        }
    }
    
    // Load content library
    async function loadContentLibrary() {
        try {
            const stored = await chrome.storage.local.get('content_library');
            const library = stored.content_library || [];
            
            if (!contentLibrary) return;
            
            if (library.length === 0) {
                contentLibrary.innerHTML = '<p class="empty-state">No saved content yet. Generate content to build your library.</p>';
                return;
            }
            
            let html = '';
            library.forEach((item, index) => {
                const date = new Date(item.timestamp);
                const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const preview = item.content.substring(0, 150) + (item.content.length > 150 ? '...' : '');
                
                html += `
                    <div class="content-library-item" data-index="${index}">
                        <div class="content-library-item-header">
                            <div class="content-library-item-title">${item.type.charAt(0).toUpperCase() + item.type.slice(1)} - ${item.topic || 'General'}</div>
                            <div class="content-library-item-date">${dateStr}</div>
                        </div>
                        <div class="content-library-item-preview">${preview}</div>
                        <div class="content-library-item-actions">
                            <button class="secondary-btn view-content-btn" data-index="${index}">View</button>
                            <button class="secondary-btn copy-library-content-btn" data-index="${index}">Copy</button>
                        </div>
                    </div>
                `;
            });
            
            contentLibrary.innerHTML = html;
            
            // Add event listeners
            contentLibrary.querySelectorAll('.view-content-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    viewContentFromLibrary(library[index]);
                });
            });
            
            contentLibrary.querySelectorAll('.copy-library-content-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const success = await copyToClipboard(library[index].content);
                    if (success) {
                        e.target.textContent = '✓ Copied!';
                        setTimeout(() => {
                            e.target.textContent = 'Copy';
                        }, 2000);
                    }
                });
            });
            
        } catch (error) {
            log(`[ContentLib] Error loading: ${error.message}`);
        }
    }
    
    // View content from library
    function viewContentFromLibrary(item) {
        if (generatedContentText) {
            generatedContentText.textContent = item.content;
        }
        
        const charCount = item.content.length;
        const wordCount = item.content.split(/\s+/).filter(w => w.length > 0).length;
        const readTime = Math.ceil(wordCount / 200);
        
        if (contentCharCount) contentCharCount.textContent = charCount.toLocaleString();
        if (contentWordCount) contentWordCount.textContent = wordCount.toLocaleString();
        if (contentReadTime) contentReadTime.textContent = `${readTime} min`;
        
        if (contentStrategyTips) {
            let tipsHtml = '';
            if (item.strategy) {
                tipsHtml += `<p><strong>Strategy:</strong> ${item.strategy}</p>`;
            }
            if (item.tips && Array.isArray(item.tips)) {
                tipsHtml += '<ul>';
                item.tips.forEach(tip => {
                    tipsHtml += `<li>${tip}</li>`;
                });
                tipsHtml += '</ul>';
            }
            if (item.hashtags && Array.isArray(item.hashtags)) {
                tipsHtml += `<p><strong>Suggested Hashtags:</strong> ${item.hashtags.join(' ')}</p>`;
            }
            contentStrategyTips.innerHTML = tipsHtml || '<p>No additional tips available.</p>';
        }
        
        if (generatedContentSection) {
            generatedContentSection.classList.remove('hidden');
        }
        
        // Scroll to content
        generatedContentSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Load stored content analyses
    async function loadStoredAnalyses() {
        const storedAnalysesList = document.getElementById('storedAnalysesList');
        if (!storedAnalysesList) return;
        
        try {
            const currentApiKey = await getApiKey();
            if (!currentApiKey) {
                storedAnalysesList.innerHTML = '<p class="empty-state">API key required to load stored analyses.</p>';
                return;
            }
            
            const response = await fetch(`${BACKEND_URL}/api/content-analyses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': currentApiKey
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to load stored analyses');
            }
            
            const result = await response.json();
            const analyses = result.analyses || [];
            
            if (analyses.length === 0) {
                storedAnalysesList.innerHTML = '<p class="empty-state">No stored analyses yet. Analyze a profile to store insights.</p>';
                return;
            }
            
            // Sort by date (newest first)
            analyses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            
            let html = '';
            analyses.forEach((analysis) => {
                const date = new Date(analysis.created_at);
                const dateStr = date.toLocaleDateString();
                const analysisData = analysis.analysis_data || {};
                const topics = analysisData.topics || [];
                const writingStyle = analysisData.writingStyle || {};
                const postsAnalyzed = analysisData.postsAnalyzed || 0;
                
                // Format topics as tags (max 3 visible)
                const topicsDisplay = topics.slice(0, 3).map(topic => 
                    `<span class="topic-tag-small">${topic}</span>`
                ).join('');
                const moreTopics = topics.length > 3 ? ` +${topics.length - 3} more` : '';
                
                // Format style
                const styleDisplay = writingStyle.tone || 'N/A';
                
                html += `
                    <div class="stored-analysis-item" data-analysis-id="${analysis.analysis_id}">
                        <div class="stored-analysis-header">
                            <div class="stored-analysis-info">
                                <div class="stored-analysis-name">${analysis.profile_name || 'Unknown Profile'}</div>
                                <div class="stored-analysis-meta">
                                    ${postsAnalyzed} posts • ${dateStr}
                                </div>
                            </div>
                            <button class="delete-analysis-btn" data-analysis-id="${analysis.analysis_id}" title="Delete">×</button>
                        </div>
                        <div class="stored-analysis-details">
                            <div class="stored-analysis-topics">
                                <span class="stored-analysis-label">Topics:</span>
                                ${topicsDisplay}
                                ${moreTopics ? `<span class="topics-more">${moreTopics}</span>` : ''}
                            </div>
                            <div class="stored-analysis-style">
                                <span class="stored-analysis-label">Style:</span>
                                <span class="style-value">${styleDisplay}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            storedAnalysesList.innerHTML = html;
            
            // Add event listeners for delete buttons
            storedAnalysesList.querySelectorAll('.delete-analysis-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const analysisId = e.target.dataset.analysisId;
                    if (confirm('Are you sure you want to delete this analysis?')) {
                        await deleteContentAnalysis(analysisId);
                    }
                });
            });
            
            // Make items clickable to load analysis
            storedAnalysesList.querySelectorAll('.stored-analysis-item').forEach(item => {
                item.style.cursor = 'pointer';
                item.addEventListener('click', async (e) => {
                    // Don't trigger if clicking delete button
                    if (e.target.classList.contains('delete-analysis-btn')) {
                        return;
                    }
                    
                    const analysisId = item.dataset.analysisId;
                    const analysis = analyses.find(a => a.analysis_id === analysisId);
                    if (analysis) {
                        // Load this analysis as the current reference
                        analyzedContentReferences = {
                            topics: analysis.analysis_data.topics || [],
                            themes: analysis.analysis_data.themes || [],
                            patterns: analysis.analysis_data.patterns || [],
                            writingStyle: analysis.analysis_data.writingStyle || {},
                            engagementInsights: analysis.analysis_data.engagementInsights || {},
                            examples: analysis.analysis_data.examplePosts || [],
                            suggestions: analysis.analysis_data.suggestions || [],
                            profileUrl: analysis.profile_url,
                            profileName: analysis.profile_name,
                            postsAnalyzed: analysis.analysis_data.postsAnalyzed || 0,
                            timestamp: analysis.created_at,
                            analysisId: analysis.analysis_id,
                            fullAnalysis: analysis.analysis_data
                        };
                        
                        // Display the analysis
                        if (analyzedTopicsList) {
                            let topicsHtml = '<div style="margin-bottom: 12px;"><strong>Topics Found:</strong></div><div style="display: flex; flex-wrap: wrap; gap: 6px;">';
                            (analysis.analysis_data.topics || []).forEach(topic => {
                                topicsHtml += `<span class="topic-tag">${topic}</span>`;
                            });
                            topicsHtml += '</div>';
                            
                            if (analysis.analysis_data.writingStyle) {
                                topicsHtml += '<div style="margin-top: 12px; padding: 8px; background: var(--input-bg); border-radius: 4px; font-size: 12px;">';
                                topicsHtml += '<strong>Writing Style:</strong><br>';
                                if (analysis.analysis_data.writingStyle.tone) topicsHtml += `Tone: ${analysis.analysis_data.writingStyle.tone}<br>`;
                                if (analysis.analysis_data.writingStyle.structure) topicsHtml += `Structure: ${analysis.analysis_data.writingStyle.structure}<br>`;
                                if (analysis.analysis_data.writingStyle.hookStyle) topicsHtml += `Hook Style: ${analysis.analysis_data.writingStyle.hookStyle}`;
                                topicsHtml += '</div>';
                            }
                            
                            analyzedTopicsList.innerHTML = topicsHtml;
                        }
                        
                        if (analyzedContentExamples) {
                            let examplesHtml = '<div style="margin-top: 12px;"><strong>Example Posts (with Engagement):</strong></div>';
                            (analysis.analysis_data.examplePosts || []).slice(0, 5).forEach((example) => {
                                const engagement = example.engagement || {};
                                examplesHtml += `
                                    <div style="margin-top: 8px; padding: 8px; background: var(--input-bg); border-radius: 4px; font-size: 12px;">
                                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
                                            <div style="font-weight: 600;">${example.topic || 'Topic'}</div>
                                            <div style="font-size: 11px; color: var(--accent-color);">
                                                👍 ${engagement.likes || 0} | 💬 ${engagement.comments || 0} | 🔄 ${engagement.shares || 0}
                                            </div>
                                        </div>
                                        <div style="color: var(--text-secondary); margin-bottom: 4px;">${example.excerpt || ''}</div>
                                        <div style="font-size: 11px; color: var(--accent-color); margin-bottom: 4px;">${example.whyItWorks || ''}</div>
                                        ${example.keyElements && example.keyElements.length > 0 ? `<div style="font-size: 10px; color: var(--text-secondary);">Key elements: ${example.keyElements.join(', ')}</div>` : ''}
                                    </div>
                                `;
                            });
                            analyzedContentExamples.innerHTML = examplesHtml;
                        }
                        
                        if (contentAnalysisResults) {
                            contentAnalysisResults.classList.remove('hidden');
                        }
                        
                        // Switch to Create tab to use the analysis
                        showTab('tab-create');
                        alert('Analysis loaded! You can now use these insights for content generation.');
                    }
                });
            });
            
        } catch (error) {
            log(`[StoredAnalyses] Error loading: ${error.message}`);
            storedAnalysesList.innerHTML = `<p class="empty-state" style="color: var(--error-color);">Error loading analyses: ${error.message}</p>`;
        }
    }
    
    // Delete content analysis
    async function deleteContentAnalysis(analysisId) {
        try {
            const currentApiKey = await getApiKey();
            if (!currentApiKey) {
                alert('API key required to delete analysis');
                return;
            }
            
            const response = await fetch(`${BACKEND_URL}/api/content-analyses/${analysisId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': currentApiKey
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to delete analysis');
            }
            
            log(`[StoredAnalyses] ✓ Deleted analysis: ${analysisId}`);
            
            // Reload the list
            await loadStoredAnalyses();
            
        } catch (error) {
            log(`[StoredAnalyses] Error deleting: ${error.message}`);
            alert('Failed to delete analysis: ' + error.message);
        }
    }
    
    // Event listeners for content copilot
    if (generateContentBtn) {
        generateContentBtn.addEventListener('click', generateLinkedInContent);
    }
    
    if (copyContentBtn) {
        copyContentBtn.addEventListener('click', async () => {
            const content = generatedContentText?.textContent || '';
            if (content) {
                const success = await copyToClipboard(content);
                if (success) {
                    copyContentBtn.textContent = '✓ Copied!';
                    setTimeout(() => {
                        copyContentBtn.textContent = '📋 Copy';
                    }, 2000);
                }
            }
        });
    }
    
    if (regenerateContentBtn) {
        regenerateContentBtn.addEventListener('click', generateLinkedInContent);
    }
    
    // Event listeners for content analysis
    if (analyzeProfileContentBtn) {
        analyzeProfileContentBtn.addEventListener('click', analyzeProfileContentForInspiration);
    }
    
    if (suggestTopicsBtn) {
        suggestTopicsBtn.addEventListener('click', suggestContentTopics);
    }
    
    // Custom topics management
    async function loadCustomTopics() {
        try {
            const stored = await chrome.storage.local.get('custom_topic_suggestions');
            const topics = stored.custom_topic_suggestions || [];
            
            if (customTopicsList) {
                if (topics.length === 0) {
                    customTopicsList.innerHTML = '<div class="custom-topics-empty">No custom topics yet. Click "Add" to create one.</div>';
                } else {
                    let html = '';
                    topics.forEach((topic, index) => {
                        html += `
                            <div class="custom-topic-tag" data-topic="${topic}" data-index="${index}">
                                <span class="custom-topic-text">${topic}</span>
                                <button class="remove-custom-topic-btn" data-index="${index}" title="Remove">×</button>
                            </div>
                        `;
                    });
                    customTopicsList.innerHTML = html;
                    
                    // Add event listeners for remove buttons
                    customTopicsList.querySelectorAll('.remove-custom-topic-btn').forEach(btn => {
                        btn.addEventListener('click', async (e) => {
                            e.stopPropagation();
                            const index = parseInt(e.target.dataset.index);
                            const stored = await chrome.storage.local.get('custom_topic_suggestions');
                            const topics = stored.custom_topic_suggestions || [];
                            topics.splice(index, 1);
                            await chrome.storage.local.set({ custom_topic_suggestions: topics });
                            await loadCustomTopics();
                        });
                    });
                }
            }
        } catch (error) {
            log(`[CustomTopics] Error loading: ${error.message}`);
        }
    }
    
    // Load custom topics on page load
    if (customTopicsList) {
        loadCustomTopics();
    }
    
    if (addCustomTopicBtn) {
        addCustomTopicBtn.addEventListener('click', () => {
            const inputSection = document.getElementById('customTopicInputSection');
            if (inputSection) {
                inputSection.classList.remove('hidden');
                const input = document.getElementById('newCustomTopicInput');
                if (input) {
                    input.focus();
                }
            }
        });
    }
    
    if (saveCustomTopicBtn && newCustomTopicInput) {
        saveCustomTopicBtn.addEventListener('click', async () => {
            const topic = newCustomTopicInput.value.trim();
            if (!topic) {
                alert('Please enter a topic');
                return;
            }
            
            try {
                const stored = await chrome.storage.local.get('custom_topic_suggestions');
                const topics = stored.custom_topic_suggestions || [];
                if (topics.includes(topic)) {
                    alert('This topic is already in your list');
                    return;
                }
                topics.push(topic);
                await chrome.storage.local.set({ custom_topic_suggestions: topics });
                newCustomTopicInput.value = '';
                const inputSection = document.getElementById('customTopicInputSection');
                if (inputSection) {
                    inputSection.classList.add('hidden');
                }
                await loadCustomTopics();
                log("[CustomTopics] ✓ Topic added: " + topic);
            } catch (error) {
                log(`[CustomTopics] Error saving: ${error.message}`);
                alert('Failed to save topic: ' + error.message);
            }
        });
    }
    
    if (cancelCustomTopicBtn) {
        cancelCustomTopicBtn.addEventListener('click', () => {
            const inputSection = document.getElementById('customTopicInputSection');
            if (inputSection) {
                inputSection.classList.add('hidden');
            }
            if (newCustomTopicInput) {
                newCustomTopicInput.value = '';
            }
        });
    }
    
    // Allow Enter key to save custom topic
    if (newCustomTopicInput) {
        newCustomTopicInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && saveCustomTopicBtn) {
                saveCustomTopicBtn.click();
            } else if (e.key === 'Escape') {
                if (cancelCustomTopicBtn) {
                    cancelCustomTopicBtn.click();
                }
            }
        });
    }
    
    // Make custom topics clickable to use them
    if (customTopicsList) {
        // Use event delegation for dynamically added topics
        customTopicsList.addEventListener('click', async (e) => {
            const topicTag = e.target.closest('.custom-topic-tag');
            if (topicTag && !e.target.classList.contains('remove-custom-topic-btn')) {
                const topic = topicTag.dataset.topic;
                if (contentTopicInput && topic) {
                    contentTopicInput.value = topic;
                    contentTopicInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    contentTopicInput.classList.add('topic-selected');
                    setTimeout(() => {
                        contentTopicInput.classList.remove('topic-selected');
                    }, 2000);
                }
            }
        });
    }
    
    if (clearTopicBtn) {
        clearTopicBtn.addEventListener('click', () => {
            if (contentTopicInput) {
                contentTopicInput.value = '';
            }
            if (suggestedTopicsContainer) {
                suggestedTopicsContainer.classList.add('hidden');
            }
        });
    }
    
    if (useAnalyzedTopicsBtn) {
        useAnalyzedTopicsBtn.addEventListener('click', () => {
            if (analyzedContentReferences && analyzedContentReferences.topics.length > 0) {
                if (contentTopicInput) {
                    // Use first topic or let user choose
                    const topicsList = analyzedContentReferences.topics.slice(0, 5).join(', ');
                    contentTopicInput.value = topicsList;
                }
            }
        });
    }
    
    // === Job Application Functionality ===
    
    // Function to check if CV is ready and show proceed button
    function checkCvReady() {
        if (currentJobData && currentCvData) {
            // Both job and CV are available, show proceed button
            if (proceedWithCvBtnContainer) {
                proceedWithCvBtnContainer.classList.remove('hidden');
            }
            log('[CV] ✓ Ready to analyze: Job and CV both available');
        } else {
            // Hide button if not ready
            if (proceedWithCvBtnContainer) {
                proceedWithCvBtnContainer.classList.add('hidden');
            }
            if (!currentJobData && currentCvData) {
                log('[CV] Waiting for job analysis...');
            } else if (currentJobData && !currentCvData) {
                log('[CV] Waiting for CV source selection...');
            }
        }
    }
    
    // CV Source Selection
    if (cvSourceRadios && cvSourceRadios.length > 0) {
        cvSourceRadios.forEach(radio => {
            radio.addEventListener('change', async (e) => {
                if (e.target.value === 'upload') {
                    if (cvUploadSection) cvUploadSection.classList.remove('hidden');
                    // Hide proceed button until file is uploaded
                    if (proceedWithCvBtnContainer) {
                        proceedWithCvBtnContainer.classList.add('hidden');
                    }
                } else {
                    if (cvUploadSection) cvUploadSection.classList.add('hidden');
                }
                
                // If LinkedIn profile is selected, load it
                if (e.target.value === 'linkedin') {
                    const loaded = await loadLinkedInProfileAsCv();
                    if (loaded) {
                        // Show success message
                        if (linkedinProfileStatus) {
                            linkedinProfileStatus.textContent = '✓ LinkedIn profile loaded successfully';
                            linkedinProfileStatus.style.color = 'var(--accent-color)';
                            linkedinProfileStatus.style.display = 'block';
                        }
                        log('[CV] LinkedIn profile selected and loaded');
                    } else {
                        // Show error message
                        if (linkedinProfileStatus) {
                            linkedinProfileStatus.textContent = '⚠ No LinkedIn profile found. Please go to Settings and click "Capture My Profile" first.';
                            linkedinProfileStatus.style.color = '#ef4444';
                            linkedinProfileStatus.style.display = 'block';
                        }
                        log('[CV] ⚠ LinkedIn profile not found in storage');
                    }
                    // Check if ready to proceed
                    checkCvReady();
                } else {
                    // Hide status message when other option is selected
                    if (linkedinProfileStatus) {
                        linkedinProfileStatus.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // CV File Selection
    if (selectCvFileBtn && cvFileInput) {
        selectCvFileBtn.addEventListener('click', () => {
            cvFileInput.click();
        });
        
        cvFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                if (cvFileName) {
                    cvFileName.textContent = `Selected: ${file.name} (Processing...)`;
                    cvFileName.style.color = 'var(--text-secondary)';
                }
                log(`[CV] File selected: ${file.name}`);
                
                // Process file via backend
                try {
                    const currentApiKey = await getApiKey();
                    
                    // Create FormData for file upload
                    const formData = new FormData();
                    formData.append('cvFile', file);
                    
                    // Send to backend for processing
                    const response = await fetch(`${BACKEND_URL}/api/process-cv-file`, {
                        method: 'POST',
                        headers: {
                            'x-api-key': currentApiKey
                            // Don't set Content-Type - let browser set it with boundary for FormData
                        },
                        body: formData
                    });
                    
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to process file');
                    }
                    
                    const result = await response.json();
                    
                    if (!result.success || !result.content) {
                        throw new Error('File processing failed: No content extracted');
                    }
                    
                    // Store CV data with structured object if available
                    currentCvData = {
                        source: 'upload',
                        fileName: result.fileName,
                        fileType: result.fileType,
                        content: result.content,
                        structured: result.structured || null // Store structured CV object
                    };
                    
                    // Store structured CV separately for easy access
                    if (result.structured) {
                        currentCvStructured = result.structured;
                        finalCvStructured = null; // Reset final CV until suggestions are applied
                        log(`[CV] ✓ CV structured into JSON object`);
                    }
                    
                    log(`[CV] File processed successfully: ${result.characterCount} chars, ${result.wordCount} words`);
                    if (cvFileName) {
                        const statusText = result.structured 
                            ? `Selected: ${result.fileName} (✓ ${result.wordCount} words, structured)`
                            : `Selected: ${result.fileName} (✓ ${result.wordCount} words)`;
                        cvFileName.textContent = statusText;
                        cvFileName.style.color = 'var(--accent-color)';
                    }
                    
                    // Check if ready to proceed
                    checkCvReady();
                    
                    // If job is already analyzed, automatically trigger CV analysis
                    if (currentJobData && currentCvData) {
                        // Small delay to ensure UI updates
                        setTimeout(async () => {
                            // Switch to CV Analysis tab and trigger analysis
                            showTab('tab-cv-edit');
                            await analyzeCvAgainstJob();
                        }, 300);
                    }
                } catch (error) {
                    log(`[CV] Error processing file: ${error.message}`);
                    if (cvFileName) {
                        cvFileName.textContent = `Error: ${error.message}`;
                        cvFileName.style.color = '#ef4444';
                    }
                    alert('Failed to process file: ' + error.message);
                }
            }
        });
    }
    
    // Analyze Job Button
    if (analyzeJobBtn) {
        analyzeJobBtn.addEventListener('click', async () => {
            try {
                analyzeJobBtn.disabled = true;
                if (jobAnalysisStatusBadge) jobAnalysisStatusBadge.textContent = 'Extracting...';
                
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab || !tab.url.includes('linkedin.com/jobs/')) {
                    throw new Error('Please navigate to a LinkedIn job posting page');
                }
                
                if (!(await ensureContentScript(tab.id))) {
                    throw new Error('Please refresh the page');
                }
                
                // Step 1: Extract raw job data from page
                log('[Job] Extracting raw job data from page...');
                const response = await chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_JOB' });
                if (!response?.success) {
                    throw new Error(response?.error || 'Failed to extract job details');
                }
                
                const rawJobData = response.data;
                log('[Job] ✓ Raw data extracted');
                
                // Step 2: Use GPT-4o to analyze and structure job details
                if (jobAnalysisStatusBadge) jobAnalysisStatusBadge.textContent = 'Analyzing with AI...';
                
                const currentApiKey = await getApiKey();
                const useBackend = await chrome.storage.local.get('use_backend_credits');
                const useBackendCredits = useBackend.use_backend_credits !== false;
                
                let openaiApiKey = null;
                if (!useBackendCredits) {
                    const stored = await chrome.storage.local.get('openai_api_key');
                    openaiApiKey = stored.openai_api_key;
                    if (!openaiApiKey) {
                        throw new Error('Please set your OpenAI API key in Settings');
                    }
                }
                
                const jobAnalysisPrompt = `You are an expert job posting analyzer. Analyze the following LinkedIn job posting and extract all relevant details in a structured format.

RAW JOB DATA:
Title: ${rawJobData.title || 'N/A'}
Company: ${rawJobData.company || 'N/A'}
Location: ${rawJobData.location || 'N/A'}
Employment Type: ${rawJobData.employmentType || 'N/A'}
Seniority Level: ${rawJobData.seniorityLevel || 'N/A'}
Posted Date: ${rawJobData.postedDate || 'N/A'}
Applicants: ${rawJobData.applicants || 'N/A'}
Job URL: ${rawJobData.jobUrl || 'N/A'}

FULL JOB DESCRIPTION:
${rawJobData.description || 'N/A'}

Please analyze this job posting and extract the following structured information:

1. Job Title (exact title)
2. Company Name
3. Location (city, state, country)
4. Employment Type (Full-time, Part-time, Contract, etc.)
5. Seniority Level (Entry level, Mid-Senior, Director, etc.)
6. Job Function (e.g., Engineering, Sales, Marketing)
7. Industries (array of relevant industries)
8. Description (full job description)
9. Requirements (extracted requirements section)
10. Responsibilities (extracted responsibilities/duties)
11. Skills Required (array of technical and soft skills)
12. Qualifications (education, certifications, experience requirements)
13. Benefits (if mentioned)
14. Salary Range (if mentioned)
15. Posted Date
16. Applicants Count

Format your response as JSON with this exact structure:
{
  "jobTitle": "string",
  "companyName": "string",
  "location": "string",
  "employmentType": "string",
  "seniorityLevel": "string",
  "jobFunction": "string",
  "industries": ["industry1", "industry2"],
  "description": "full description text",
  "requirements": "requirements section text",
  "responsibilities": "responsibilities section text",
  "skillsRequired": ["skill1", "skill2", "skill3"],
  "qualifications": {
    "education": "education requirements",
    "experience": "experience requirements",
    "certifications": "certifications if any"
  },
  "benefits": ["benefit1", "benefit2"],
  "salaryRange": "salary range if mentioned",
  "postedDate": "posted date",
  "applicantsCount": "number of applicants if mentioned"
}

Be thorough and extract all available information. If a field is not mentioned, use null or an empty array/string as appropriate.`;
                
                const analysisRequestBody = {
                    request: {
                        model: 'gpt-5.2',
                        messages: [
                            { role: 'system', content: 'You are an expert job posting analyzer. Extract all relevant details from job postings in a structured JSON format.' },
                            { role: 'user', content: jobAnalysisPrompt }
                        ],
                        temperature: 0.3,
                        response_format: { type: 'json_object' }
                    },
                    processType: 'job_analysis',
                    processDescription: `Job analysis for: ${rawJobData.title || 'Unknown'}`
                };
                
                let analysisResponse;
                if (useBackendCredits) {
                    analysisResponse = await fetch(`${BACKEND_URL}/api/openai-proxy`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': currentApiKey
                        },
                        body: JSON.stringify(analysisRequestBody)
                    });
                } else {
                    analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${openaiApiKey}`
                        },
                        body: JSON.stringify(analysisRequestBody.request)
                    });
                }
                
                if (!analysisResponse.ok) {
                    const errorData = await analysisResponse.json();
                    throw new Error(errorData.error?.message || 'Failed to analyze job with AI');
                }
                
                const analysisData = await analysisResponse.json();
                const analysisText = analysisData.response?.choices?.[0]?.message?.content || analysisData.choices?.[0]?.message?.content || '';
                
                // Parse analyzed job data
                let analyzedJobData = null;
                try {
                    analyzedJobData = JSON.parse(analysisText);
                } catch (e) {
                    // Try to extract JSON from response
                    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        analyzedJobData = JSON.parse(jsonMatch[0]);
                    } else {
                        throw new Error('Failed to parse AI analysis response');
                    }
                }
                
                log('[Job] ✓ AI analysis complete');
                
                // Step 3: Save to database
                if (jobAnalysisStatusBadge) jobAnalysisStatusBadge.textContent = 'Saving...';
                
                const saveResponse = await fetch(`${BACKEND_URL}/api/job-analyses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': currentApiKey
                    },
                    body: JSON.stringify({
                        jobUrl: rawJobData.jobUrl || tab.url,
                        jobTitle: analyzedJobData.jobTitle || rawJobData.title,
                        companyName: analyzedJobData.companyName || rawJobData.company,
                        location: analyzedJobData.location || rawJobData.location,
                        employmentType: analyzedJobData.employmentType || rawJobData.employmentType,
                        seniorityLevel: analyzedJobData.seniorityLevel || rawJobData.seniorityLevel,
                        jobFunction: analyzedJobData.jobFunction || null,
                        industries: analyzedJobData.industries || [],
                        description: analyzedJobData.description || rawJobData.description,
                        requirements: analyzedJobData.requirements || null,
                        responsibilities: analyzedJobData.responsibilities || null,
                        skillsRequired: analyzedJobData.skillsRequired || [],
                        qualifications: analyzedJobData.qualifications || null,
                        benefits: analyzedJobData.benefits || [],
                        salaryRange: analyzedJobData.salaryRange || null,
                        postedDate: analyzedJobData.postedDate || rawJobData.postedDate,
                        applicantsCount: analyzedJobData.applicantsCount || rawJobData.applicants,
                        rawData: rawJobData,
                        analyzedData: analyzedJobData
                    })
                });
                
                if (!saveResponse.ok) {
                    const errorData = await saveResponse.json();
                    log(`[Job] ⚠ Failed to save to database: ${errorData.error}`);
                    // Continue even if save fails
                } else {
                    const saveData = await saveResponse.json();
                    log(`[Job] ✓ Saved to database: ${saveData.jobAnalysisId}`);
                }
                
                // Store in currentJobData for use in CV analysis
                currentJobData = {
                    ...analyzedJobData,
                    jobUrl: rawJobData.jobUrl || tab.url,
                    rawData: rawJobData
                };
                
                // Display job details
                if (jobDetailsDisplay) {
                    jobDetailsDisplay.innerHTML = `
                        <div class="job-detail-item">
                            <strong>Title:</strong>
                            <p>${analyzedJobData.jobTitle || rawJobData.title || 'N/A'}</p>
                        </div>
                        <div class="job-detail-item">
                            <strong>Company:</strong>
                            <p>${analyzedJobData.companyName || rawJobData.company || 'N/A'}</p>
                        </div>
                        <div class="job-detail-item">
                            <strong>Location:</strong>
                            <p>${analyzedJobData.location || rawJobData.location || 'N/A'}</p>
                        </div>
                        <div class="job-detail-item">
                            <strong>Employment Type:</strong>
                            <p>${analyzedJobData.employmentType || rawJobData.employmentType || 'N/A'}</p>
                        </div>
                        <div class="job-detail-item">
                            <strong>Seniority Level:</strong>
                            <p>${analyzedJobData.seniorityLevel || rawJobData.seniorityLevel || 'N/A'}</p>
                        </div>
                        ${analyzedJobData.jobFunction ? `<div class="job-detail-item"><strong>Job Function:</strong><p>${analyzedJobData.jobFunction}</p></div>` : ''}
                        ${analyzedJobData.industries && analyzedJobData.industries.length > 0 ? `<div class="job-detail-item"><strong>Industries:</strong><p>${analyzedJobData.industries.join(', ')}</p></div>` : ''}
                        ${analyzedJobData.skillsRequired && analyzedJobData.skillsRequired.length > 0 ? `<div class="job-detail-item"><strong>Skills Required:</strong><p>${analyzedJobData.skillsRequired.join(', ')}</p></div>` : ''}
                        ${analyzedJobData.salaryRange ? `<div class="job-detail-item"><strong>Salary Range:</strong><p>${analyzedJobData.salaryRange}</p></div>` : ''}
                        <div class="job-detail-item">
                            <strong>Description:</strong>
                            <p>${analyzedJobData.description ? analyzedJobData.description.substring(0, 500) + '...' : rawJobData.description ? rawJobData.description.substring(0, 500) + '...' : 'N/A'}</p>
                        </div>
                    `;
                }
                
                if (jobAnalysisResults) jobAnalysisResults.classList.remove('hidden');
                if (jobAnalysisStatusBadge) jobAnalysisStatusBadge.textContent = 'Complete';
                
                log('[Job] ✓ Job analysis complete and saved');
                
                // Auto-load LinkedIn profile if not already loaded
                if (!currentCvData) {
                    const loaded = await loadLinkedInProfileAsCv();
                    if (loaded) {
                        // Auto-select LinkedIn radio button if profile was loaded
                        const linkedinRadio = document.querySelector('input[name="cvSource"][value="linkedin"]');
                        if (linkedinRadio) {
                            linkedinRadio.checked = true;
                        }
                        // Check if ready to proceed
                        checkCvReady();
                    }
                } else {
                    // CV already loaded, check if ready
                    checkCvReady();
                }
                
                log('[Job] Job analyzed. Select CV source and click "Analyze CV Against Job" to continue.');
                
            } catch (error) {
                log(`[Job] ✗ Error: ${error.message}`);
                alert('Error analyzing job: ' + error.message);
                if (jobAnalysisStatusBadge) jobAnalysisStatusBadge.textContent = 'Error';
            } finally {
                analyzeJobBtn.disabled = false;
            }
        });
    }
    
    // Analyze CV against Job
    async function analyzeCvAgainstJob() {
        if (!currentJobData || !currentCvData) {
            alert('Please analyze a job and provide your CV first');
            return;
        }
        
        let statusInterval = null; // Declare at function scope
        
        try {
            // Ensure CV Analysis tab is visible and content area is shown
            showTab('tab-cv-edit');
            if (cvEditorEmptyState) cvEditorEmptyState.classList.add('hidden');
            if (cvEditorContent) cvEditorContent.classList.remove('hidden');
            
            // Hide match score container during analysis
            if (cvMatchScoreContainer) {
                cvMatchScoreContainer.style.display = 'none';
            }
            
            // Show loading status with dynamic messages
            if (cvAnalysisStatus) {
                cvAnalysisStatus.classList.remove('hidden');
            }
            if (cvAnalysisResults) {
                // Show intermediate steps in the results area
                cvAnalysisResults.innerHTML = `
                    <div style="padding: 16px;">
                        <div style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Analysis in Progress</div>
                        <div id="cvAnalysisSteps" style="display: flex; flex-direction: column; gap: 12px;">
                            <div class="analysis-step" data-step="0" style="display: flex; align-items: center; gap: 10px; padding: 8px; background: var(--input-bg); border-radius: 6px;">
                                <div class="step-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--accent-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <div class="step-spinner" style="width: 10px; height: 10px; border: 2px solid var(--accent-color); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                                </div>
                                <div style="flex: 1; font-size: 11px; color: var(--text-primary);">Analyzing CV against job requirements...</div>
                            </div>
                            <div class="analysis-step" data-step="1" style="display: flex; align-items: center; gap: 10px; padding: 8px; opacity: 0.5;">
                                <div class="step-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"></div>
                                <div style="flex: 1; font-size: 11px; color: var(--text-secondary);">Reviewing your skills and experience...</div>
                            </div>
                            <div class="analysis-step" data-step="2" style="display: flex; align-items: center; gap: 10px; padding: 8px; opacity: 0.5;">
                                <div class="step-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"></div>
                                <div style="flex: 1; font-size: 11px; color: var(--text-secondary);">Comparing CV with job description...</div>
                            </div>
                            <div class="analysis-step" data-step="3" style="display: flex; align-items: center; gap: 10px; padding: 8px; opacity: 0.5;">
                                <div class="step-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"></div>
                                <div style="flex: 1; font-size: 11px; color: var(--text-secondary);">Identifying strengths and gaps...</div>
                            </div>
                            <div class="analysis-step" data-step="4" style="display: flex; align-items: center; gap: 10px; padding: 8px; opacity: 0.5;">
                                <div class="step-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"></div>
                                <div style="flex: 1; font-size: 11px; color: var(--text-secondary);">Generating personalized suggestions...</div>
                            </div>
                            <div class="analysis-step" data-step="5" style="display: flex; align-items: center; gap: 10px; padding: 8px; opacity: 0.5;">
                                <div class="step-icon" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"></div>
                                <div style="flex: 1; font-size: 11px; color: var(--text-secondary);">Finalizing analysis results...</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (regenerateAnalysisBtn) {
                regenerateAnalysisBtn.disabled = true;
                regenerateAnalysisBtn.textContent = 'Analyzing...';
            }
            
            // Update status text
            if (cvAnalysisStatusText) {
                cvAnalysisStatusText.textContent = 'Analyzing CV against job requirements...';
            }
            
            // Function to update step progress
            const updateStepProgress = (stepIndex) => {
                const stepsContainer = document.getElementById('cvAnalysisSteps');
                if (!stepsContainer) return;
                
                const steps = stepsContainer.querySelectorAll('.analysis-step');
                steps.forEach((step, index) => {
                    const stepIcon = step.querySelector('.step-icon');
                    const stepText = step.querySelector('div:last-child');
                    
                    if (index < stepIndex) {
                        // Completed step
                        step.style.opacity = '1';
                        step.style.background = 'rgba(34, 197, 94, 0.1)';
                        stepIcon.innerHTML = '✓';
                        stepIcon.style.border = '2px solid #22c55e';
                        stepIcon.style.background = '#22c55e';
                        stepIcon.style.color = 'white';
                        stepIcon.style.fontSize = '12px';
                        stepText.style.color = 'var(--text-primary)';
                    } else if (index === stepIndex) {
                        // Current step
                        step.style.opacity = '1';
                        step.style.background = 'var(--input-bg)';
                        stepIcon.innerHTML = '<div class="step-spinner" style="width: 10px; height: 10px; border: 2px solid var(--accent-color); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>';
                        stepIcon.style.border = '2px solid var(--accent-color)';
                        stepIcon.style.background = 'transparent';
                        stepText.style.color = 'var(--text-primary)';
                    } else {
                        // Pending step
                        step.style.opacity = '0.5';
                        step.style.background = 'transparent';
                        stepIcon.innerHTML = '';
                        stepIcon.style.border = '2px solid var(--border-color)';
                        stepIcon.style.background = 'transparent';
                        stepText.style.color = 'var(--text-secondary)';
                    }
                });
            };
            
            // Update status text and step progress
            const statusMessages = [
                'Analyzing CV against job requirements...',
                'Reviewing your skills and experience...',
                'Comparing CV with job description...',
                'Identifying strengths and gaps...',
                'Generating personalized suggestions...',
                'Finalizing analysis results...'
            ];
            
            let statusIndex = 0;
            
            const updateStatus = () => {
                if (statusIndex < statusMessages.length) {
                    if (cvAnalysisStatusText) {
                        cvAnalysisStatusText.textContent = statusMessages[statusIndex];
                    }
                    updateStepProgress(statusIndex);
                    statusIndex++;
                } else if (statusIndex >= statusMessages.length) {
                    // Loop back to beginning if analysis takes longer
                    statusIndex = 0;
                    if (cvAnalysisStatusText) {
                        cvAnalysisStatusText.textContent = statusMessages[statusIndex];
                    }
                    updateStepProgress(statusIndex);
                    statusIndex++;
                }
            };
            
            // Initial status
            updateStepProgress(0);
            
            // Update status every 2 seconds
            statusInterval = setInterval(updateStatus, 2000);
            
            const currentApiKey = await getApiKey();
            const useBackend = await chrome.storage.local.get('use_backend_credits');
            const useBackendCredits = useBackend.use_backend_credits !== false;
            
            let openaiApiKey = null;
            if (!useBackendCredits) {
                const stored = await chrome.storage.local.get('openai_api_key');
                openaiApiKey = stored.openai_api_key;
                if (!openaiApiKey) {
                    throw new Error('Please set your OpenAI API key in Settings');
                }
            }
            
            const cvContent = currentCvData.content;
            const jobDescription = currentJobData.description || currentJobData.rawData?.description || '';
            const jobTitle = currentJobData.jobTitle || currentJobData.title || '';
            const jobRequirements = currentJobData.requirements || '';
            const jobResponsibilities = currentJobData.responsibilities || '';
            const skillsRequired = currentJobData.skillsRequired || [];
            const qualifications = currentJobData.qualifications || null;
            
            const prompt = `You are an expert CV/resume analyzer and career advisor. Analyze the following CV against this job posting and provide detailed, actionable suggestions with specific examples.

JOB TITLE: ${jobTitle}
JOB DESCRIPTION:
${jobDescription}

${jobRequirements ? `JOB REQUIREMENTS:\n${jobRequirements}\n` : ''}
${jobResponsibilities ? `JOB RESPONSIBILITIES:\n${jobResponsibilities}\n` : ''}
${skillsRequired.length > 0 ? `REQUIRED SKILLS:\n${skillsRequired.join(', ')}\n` : ''}
${qualifications ? `QUALIFICATIONS:\n${JSON.stringify(qualifications, null, 2)}\n` : ''}

CV/RESUME:
${cvContent}

Please provide a comprehensive analysis with:
1. A match score (0-100) indicating how well the CV matches the job
2. Key strengths that align with the job requirements
3. Missing skills or experiences that should be added
4. Specific, actionable suggestions with relevant examples
5. Recommended changes to make the CV more relevant

IMPORTANT: For each suggestion, provide a concrete example of how to improve it. For instance:
- If suggesting to add a skill, show how to phrase it: "Add 'Proficient in React and Node.js' to Skills section"
- If suggesting to modify experience, provide before/after example
- If suggesting to add achievements, provide example bullet points with metrics

Format your response as JSON with the following structure:
{
  "matchScore": <number 0-100>,
  "strengths": ["strength1", "strength2", ...],
  "missingSkills": ["skill1", "skill2", ...],
  "suggestions": [
    {
      "type": "add|modify|remove",
      "section": "experience|skills|education|summary|projects",
      "suggestion": "detailed suggestion text explaining what to change",
      "example": "concrete example showing how to implement the suggestion (before/after or specific phrasing)",
      "priority": "high|medium|low",
      "reason": "why this change improves match with job requirements"
    }
  ],
  "recommendedChanges": "overall recommendation text with actionable steps",
  "exampleImprovements": [
    {
      "current": "current CV text that needs improvement",
      "improved": "improved version with example",
      "explanation": "why this improvement helps"
    }
  ]
}`;
            
            const requestBody = {
                request: {
                    model: 'gpt-5.2',
                    messages: [
                        { role: 'system', content: 'You are an expert CV/resume analyzer and career advisor. Always respond with valid JSON format.' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    response_format: { type: 'json_object' }
                },
                processType: 'cv_job_analysis',
                processDescription: `CV analysis for job: ${jobTitle}`
            };
            
            let response;
            if (useBackendCredits) {
                response = await fetch(`${BACKEND_URL}/api/openai-proxy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': currentApiKey
                    },
                    body: JSON.stringify(requestBody)
                });
            } else {
                response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${openaiApiKey}`
                    },
                    body: JSON.stringify(requestBody.request)
                });
            }
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to analyze CV');
            }
            
            // Clear status interval
            if (statusInterval) {
                clearInterval(statusInterval);
            }
            
            // Mark all steps as completed
            const stepsContainer = document.getElementById('cvAnalysisSteps');
            if (stepsContainer) {
                const steps = stepsContainer.querySelectorAll('.analysis-step');
                steps.forEach((step) => {
                    const stepIcon = step.querySelector('.step-icon');
                    const stepText = step.querySelector('div:last-child');
                    step.style.opacity = '1';
                    step.style.background = 'rgba(34, 197, 94, 0.1)';
                    stepIcon.innerHTML = '✓';
                    stepIcon.style.border = '2px solid #22c55e';
                    stepIcon.style.background = '#22c55e';
                    stepIcon.style.color = 'white';
                    stepIcon.style.fontSize = '12px';
                    stepText.style.color = 'var(--text-primary)';
                });
            }
            
            // Update status to final processing message
            if (cvAnalysisStatusText) {
                cvAnalysisStatusText.textContent = 'Processing analysis results...';
            }
            
            const data = await response.json();
            const analysisText = data.response?.choices?.[0]?.message?.content || data.choices?.[0]?.message?.content || '';
            
            // Try to parse JSON from response
            let analysisData = null;
            try {
                const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    analysisData = JSON.parse(jsonMatch[0]);
                }
            } catch (e) {
                // If JSON parsing fails, use the text as-is
                analysisData = { analysis: analysisText };
            }
            
            currentCvSuggestions = analysisData;
            
            // Apply suggestions to structured CV and store final version (hidden, for download)
            if (currentCvStructured || (currentCvData && currentCvData.structured)) {
                const structuredCv = currentCvStructured || currentCvData.structured;
                finalCvStructured = applySuggestionsToStructuredCv(structuredCv);
                log(`[CV] ✓ Created final structured CV with AI additions (hidden object, ready for download)`);
            } else if (currentCvData && currentCvData.content) {
                // If no structured CV, try to create one from content
                // This will be done on download if needed
                log(`[CV] No structured CV available, will structure on download`);
            }
            
            // Hide loading status
            if (cvAnalysisStatus) {
                cvAnalysisStatus.classList.add('hidden');
            }
            if (regenerateAnalysisBtn) {
                regenerateAnalysisBtn.disabled = false;
                regenerateAnalysisBtn.textContent = '🔄 Re-analyze';
            }
            
            // Display match score in separate box
            if (cvMatchScoreContainer && analysisData.matchScore !== undefined) {
                const score = analysisData.matchScore;
                const scoreColor = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
                const scoreLabel = score >= 70 ? 'Excellent Match' : score >= 50 ? 'Good Match' : 'Needs Improvement';
                
                cvMatchScoreContainer.innerHTML = `
                    <div style="padding: 16px; background: var(--card-bg); border-radius: 8px; border: 2px solid ${scoreColor}40; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 50px; height: 50px; position: relative; flex-shrink: 0;">
                                <svg width="50" height="50" style="transform: rotate(-90deg);">
                                    <circle cx="25" cy="25" r="20" stroke="var(--border-color)" stroke-width="4" fill="none"/>
                                    <circle cx="25" cy="25" r="20" stroke="${scoreColor}" stroke-width="4" fill="none"
                                        stroke-dasharray="${2 * Math.PI * 20}" 
                                        stroke-dashoffset="${2 * Math.PI * 20 * (1 - score / 100)}"
                                        stroke-linecap="round"/>
                                </svg>
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; font-weight: bold; color: ${scoreColor};">
                                    ${score}
                                </div>
                            </div>
                            <div style="flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px;">
                                <div style="font-size: 9px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Match Score</div>
                                <div style="font-size: 22px; font-weight: bold; color: ${scoreColor}; line-height: 1.1;">
                                    ${score}%
                                </div>
                                <div style="font-size: 9px; color: var(--text-secondary);">${scoreLabel}</div>
                            </div>
                        </div>
                    </div>
                `;
                cvMatchScoreContainer.style.display = 'block';
            }
            
            // Display analysis results (strengths, missing skills, recommendations)
            if (cvAnalysisResults) {
                if (analysisData.matchScore !== undefined) {
                    const score = analysisData.matchScore;
                    const scoreColor = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
                    
                    cvAnalysisResults.innerHTML = `
                        ${analysisData.strengths ? `
                            <div style="margin-bottom: 16px; padding: 12px; background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; border-radius: 4px;">
                                <strong style="color: #22c55e; display: block; margin-bottom: 8px;">✓ Strengths:</strong>
                                <ul style="margin: 0; padding-left: 20px;">
                                    ${analysisData.strengths.map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${analysisData.missingSkills ? `
                            <div style="margin-bottom: 16px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; border-radius: 4px;">
                                <strong style="color: #ef4444; display: block; margin-bottom: 8px;">⚠ Missing Skills:</strong>
                                <ul style="margin: 0; padding-left: 20px;">
                                    ${analysisData.missingSkills.map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${analysisData.recommendedChanges ? `
                            <div style="padding: 12px; background: rgba(10, 102, 194, 0.1); border-left: 3px solid var(--accent-color); border-radius: 4px;">
                                <strong style="color: var(--accent-color); display: block; margin-bottom: 8px;">💡 Recommendations:</strong>
                                <p style="margin: 0; line-height: 1.6;">${analysisData.recommendedChanges}</p>
                            </div>
                        ` : ''}
                    `;
                } else {
                    cvAnalysisResults.textContent = analysisText;
                }
            }
            
            // Display detailed suggestions with examples
            if (detailedSuggestionsList && analysisData.suggestions) {
                detailedSuggestionsList.innerHTML = analysisData.suggestions.map(s => `
                    <div class="cv-suggestion-item">
                        <strong>${s.type.toUpperCase()} - ${s.section} (${s.priority} priority)</strong>
                        <p style="margin: 8px 0;">${s.suggestion}</p>
                        ${s.example ? `
                            <div style="background: var(--input-bg); padding: 12px; border-radius: 6px; margin-top: 8px; border-left: 3px solid var(--accent-color);">
                                <strong style="font-size: 11px; color: var(--accent-color); display: block; margin-bottom: 6px;">Example:</strong>
                                <div style="font-size: 11px; font-family: monospace; white-space: pre-wrap; color: var(--text-secondary);">${s.example}</div>
                            </div>
                        ` : ''}
                        ${s.reason ? `<small style="display: block; margin-top: 8px; color: var(--text-secondary); font-size: 11px;"><em>Why: ${s.reason}</em></small>` : ''}
                    </div>
                `).join('');
                
                // Display example improvements if available
                if (analysisData.exampleImprovements && analysisData.exampleImprovements.length > 0) {
                    const improvementsHtml = `
                        <details class="details-accordion" style="margin-top: 16px;">
                            <summary class="accordion-summary" style="cursor: pointer; padding: 8px; background: var(--input-bg); border-radius: 4px;">📝 View Example Improvements</summary>
                            <div style="margin-top: 12px;">
                                ${analysisData.exampleImprovements.map(imp => `
                                    <div style="margin-bottom: 16px; padding: 12px; background: var(--input-bg); border-radius: 6px;">
                                        <div style="margin-bottom: 8px;">
                                            <strong style="font-size: 11px; color: #ef4444;">Current:</strong>
                                            <div style="font-size: 11px; font-family: monospace; white-space: pre-wrap; color: var(--text-secondary); margin-top: 4px; padding: 8px; background: rgba(239, 68, 68, 0.1); border-radius: 4px;">${imp.current}</div>
                                        </div>
                                        <div style="margin-bottom: 8px;">
                                            <strong style="font-size: 11px; color: #22c55e;">Improved:</strong>
                                            <div style="font-size: 11px; font-family: monospace; white-space: pre-wrap; color: var(--text-secondary); margin-top: 4px; padding: 8px; background: rgba(34, 197, 94, 0.1); border-radius: 4px;">${imp.improved}</div>
                                        </div>
                                        ${imp.explanation ? `<small style="display: block; color: var(--text-secondary); font-size: 11px; margin-top: 8px;"><em>${imp.explanation}</em></small>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </details>
                    `;
                    detailedSuggestionsList.insertAdjacentHTML('beforeend', improvementsHtml);
                }
            }
            
            // Update match score in sidebar with improved UI
            if (cvMatchScore && analysisData.matchScore !== undefined) {
                const score = analysisData.matchScore;
                const scoreClass = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';
                const scoreColor = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
                cvMatchScore.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 40px; height: 40px; position: relative;">
                            <svg width="40" height="40" style="transform: rotate(-90deg);">
                                <circle cx="20" cy="20" r="16" stroke="var(--border-color)" stroke-width="3" fill="none"/>
                                <circle cx="20" cy="20" r="16" stroke="${scoreColor}" stroke-width="3" fill="none"
                                    stroke-dasharray="${2 * Math.PI * 16}" 
                                    stroke-dashoffset="${2 * Math.PI * 16 * (1 - score / 100)}"
                                    stroke-linecap="round"/>
                            </svg>
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; font-weight: bold; color: ${scoreColor};">
                                ${score}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 18px; font-weight: bold; color: ${scoreColor};">${score}%</div>
                            <div style="font-size: 10px; color: var(--text-secondary);">
                                ${score >= 70 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work'}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Show CV analysis content
            if (cvEditorEmptyState) cvEditorEmptyState.classList.add('hidden');
            if (cvEditorContent) cvEditorContent.classList.remove('hidden');
            
            log('[CV] ✓ CV analysis complete');
            
        } catch (error) {
            // Clear status interval if it exists
            if (typeof statusInterval !== 'undefined' && statusInterval) {
                clearInterval(statusInterval);
            }
            
            // Hide loading status on error
            if (cvAnalysisStatus) {
                cvAnalysisStatus.classList.add('hidden');
            }
            if (regenerateAnalysisBtn) {
                regenerateAnalysisBtn.disabled = false;
                regenerateAnalysisBtn.textContent = '🔄 Re-analyze';
            }
            
            log(`[CV] ✗ Error: ${error.message}`);
            if (cvAnalysisResults) {
                cvAnalysisResults.innerHTML = `<div style="color: #ef4444; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 4px;">❌ Error: ${error.message}</div>`;
            }
            alert('Error analyzing CV: ' + error.message);
        }
    }
    
    // Helper function to extract job requirements
    function extractJobRequirements(description) {
        const requirementKeywords = ['required', 'must have', 'should have', 'qualifications', 'requirements', 'skills'];
        const lines = description.split('\n');
        const requirements = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].toLowerCase();
            if (requirementKeywords.some(keyword => line.includes(keyword))) {
                for (let j = i; j < Math.min(i + 5, lines.length); j++) {
                    if (lines[j].trim()) {
                        requirements.push(lines[j].trim());
                    }
                }
                break;
            }
        }
        
        return requirements.join('\n');
    }
    
    // Note: File reading is now handled by backend API
    // This function is kept for backward compatibility but is no longer used
    async function readFileContent(file) {
        throw new Error('File processing is now handled by the backend. Please use the file upload feature.');
    }
    
    // Update CV word count
    function updateCvWordCount() {
        if (cvEditorTextarea && cvWordCount) {
            const text = getCvText();
            const words = text.trim().split(/\s+/).filter(w => w.length > 0);
            cvWordCount.textContent = words.length;
        }
    }
    
    // Helper function to get plain text from contenteditable div (preserves all content)
    function getCvText() {
        if (!cvEditorTextarea) return '';
        
        // Clone the element to avoid modifying the original
        const clone = cvEditorTextarea.cloneNode(true);
        
        // Remove highlight spans but keep their text content
        const highlightedElements = clone.querySelectorAll('.ai-edit-highlight');
        highlightedElements.forEach(el => {
            const textNode = document.createTextNode(el.textContent);
            el.parentNode.replaceChild(textNode, el);
        });
        
        // Get text content preserving line breaks
        // Use textContent which preserves whitespace better than innerText
        let text = clone.textContent || clone.innerText || '';
        
        // Preserve line breaks by converting <br> and <div> to newlines
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = clone.innerHTML
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/div>/gi, '\n')
            .replace(/<div[^>]*>/gi, '');
        text = tempDiv.textContent || tempDiv.innerText || text;
        
        // Clean up multiple consecutive newlines but preserve structure
        text = text.replace(/\n{4,}/g, '\n\n\n');
        
        return text;
    }
    
    // Helper function to set CV text with highlighting
    function setCvTextWithHighlights(text, highlights = []) {
        if (!cvEditorTextarea) return;
        
        // Clear existing content
        cvEditorTextarea.innerHTML = '';
        
        if (!text) return;
        
        // If no highlights, just set plain text
        if (!highlights || highlights.length === 0) {
            cvEditorTextarea.textContent = text;
            return;
        }
        
        // Split text and apply highlights
        let lastIndex = 0;
        const parts = [];
        
        // Sort highlights by start position
        const sortedHighlights = highlights.sort((a, b) => a.start - b.start);
        
        sortedHighlights.forEach(highlight => {
            // Add text before highlight
            if (highlight.start > lastIndex) {
                const beforeText = text.substring(lastIndex, highlight.start);
                if (beforeText) {
                    parts.push({ text: beforeText, isHighlight: false });
                }
            }
            
            // Add highlighted text
            const highlightText = text.substring(highlight.start, highlight.end);
            if (highlightText) {
                parts.push({ text: highlightText, isHighlight: true });
            }
            
            lastIndex = highlight.end;
        });
        
        // Add remaining text
        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            if (remainingText) {
                parts.push({ text: remainingText, isHighlight: false });
            }
        }
        
        // Build HTML with highlights
        parts.forEach(part => {
            if (part.isHighlight) {
                const span = document.createElement('span');
                span.className = 'ai-edit-highlight';
                span.textContent = part.text;
                cvEditorTextarea.appendChild(span);
            } else {
                const textNode = document.createTextNode(part.text);
                cvEditorTextarea.appendChild(textNode);
            }
        });
    }
    
    // Helper function to remove all highlights and get plain text (preserves all content)
    function removeHighlights() {
        if (!cvEditorTextarea) return '';
        
        // Clone to avoid modifying original
        const clone = cvEditorTextarea.cloneNode(true);
        
        // Remove highlight spans but keep their text content
        const highlightedElements = clone.querySelectorAll('.ai-edit-highlight');
        highlightedElements.forEach(el => {
            const textNode = document.createTextNode(el.textContent);
            el.parentNode.replaceChild(textNode, el);
        });
        
        // Get text content preserving structure
        let text = clone.textContent || clone.innerText || '';
        
        // Preserve line breaks
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = clone.innerHTML
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/div>/gi, '\n')
            .replace(/<div[^>]*>/gi, '')
            .replace(/<\/p>/gi, '\n')
            .replace(/<p[^>]*>/gi, '');
        text = tempDiv.textContent || tempDiv.innerText || text;
        
        // Clean up excessive newlines but preserve structure
        text = text.replace(/\n{4,}/g, '\n\n\n');
        
        return text;
    }
    
    // Helper function to display CV in modular, readable format
    function displayCvModular() {
        if (!cvModularDisplay) return;
        
        // Use structured CV if available, otherwise use raw content
        const structuredCv = currentCvStructured || (currentCvData && currentCvData.structured);
        const rawContent = currentCvData && currentCvData.content;
        
        if (structuredCv) {
            // Display structured CV in modular format
            let html = '';
            
            // Personal Info Section
            if (structuredCv.personalInfo) {
                const info = structuredCv.personalInfo;
                html += `
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; font-size: 11px;">
                            ${info.name ? `<div><strong>Name:</strong> ${info.name}</div>` : ''}
                            ${info.email ? `<div><strong>Email:</strong> ${info.email}</div>` : ''}
                            ${info.phone ? `<div><strong>Phone:</strong> ${info.phone}</div>` : ''}
                            ${info.location ? `<div><strong>Location:</strong> ${info.location}</div>` : ''}
                            ${info.linkedin ? `<div><strong>LinkedIn:</strong> <a href="${info.linkedin}" target="_blank" style="color: var(--accent-color);">View Profile</a></div>` : ''}
                        </div>
                    </div>
                `;
            }
            
            // Summary Section
            if (structuredCv.summary) {
                html += `
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Professional Summary</h4>
                        <p style="font-size: 11px; line-height: 1.6; color: var(--text-primary);">${structuredCv.summary}</p>
                    </div>
                `;
            }
            
            // Experience Section
            if (structuredCv.experience && structuredCv.experience.length > 0) {
                html += `
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Professional Experience</h4>
                        ${structuredCv.experience.map(exp => `
                            <div style="margin-bottom: 12px; padding: 10px; background: var(--input-bg); border-radius: 6px;">
                                <div style="font-weight: 600; font-size: 11px; color: var(--text-primary); margin-bottom: 4px;">
                                    ${exp.title || ''}${exp.company ? ' at ' + exp.company : ''}
                                </div>
                                <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 6px;">
                                    ${exp.location || ''}${exp.startDate || exp.endDate ? ' • ' + (exp.startDate || '') + ' - ' + (exp.endDate || 'Present') : ''}
                                </div>
                                ${exp.description ? `<p style="font-size: 10px; line-height: 1.5; color: var(--text-primary); margin-bottom: 6px;">${exp.description}</p>` : ''}
                                ${exp.achievements && exp.achievements.length > 0 ? `
                                    <ul style="margin: 0; padding-left: 18px; font-size: 10px; line-height: 1.5;">
                                        ${exp.achievements.map(ach => `<li style="margin-bottom: 3px;">${ach}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            // Education Section
            if (structuredCv.education && structuredCv.education.length > 0) {
                html += `
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Education</h4>
                        ${structuredCv.education.map(edu => `
                            <div style="margin-bottom: 8px; padding: 8px; background: var(--input-bg); border-radius: 6px;">
                                <div style="font-weight: 600; font-size: 11px; color: var(--text-primary);">
                                    ${edu.degree || ''}${edu.school ? ' • ' + edu.school : ''}
                                </div>
                                <div style="font-size: 10px; color: var(--text-secondary);">
                                    ${edu.location || ''}${edu.graduationDate ? ' • ' + edu.graduationDate : ''}
                                    ${edu.gpa ? ' • GPA: ' + edu.gpa : ''}
                                </div>
                                ${edu.honors ? `<div style="font-size: 10px; color: var(--accent-color); margin-top: 4px;">${edu.honors}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            // Skills Section
            if (structuredCv.skills) {
                html += `
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Skills</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${structuredCv.skills.technical && structuredCv.skills.technical.length > 0 ? `
                                <div style="flex: 1; min-width: 150px;">
                                    <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 4px;">Technical:</div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                        ${structuredCv.skills.technical.map(skill => `
                                            <span style="display: inline-block; padding: 4px 8px; background: var(--accent-color); color: white; border-radius: 4px; font-size: 10px;">${skill}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${structuredCv.skills.soft && structuredCv.skills.soft.length > 0 ? `
                                <div style="flex: 1; min-width: 150px;">
                                    <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 4px;">Soft Skills:</div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                        ${structuredCv.skills.soft.map(skill => `
                                            <span style="display: inline-block; padding: 4px 8px; background: var(--input-bg); color: var(--text-primary); border-radius: 4px; font-size: 10px;">${skill}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${structuredCv.skills.languages && structuredCv.skills.languages.length > 0 ? `
                                <div style="flex: 1; min-width: 150px;">
                                    <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 4px;">Languages:</div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                        ${structuredCv.skills.languages.map(lang => `
                                            <span style="display: inline-block; padding: 4px 8px; background: var(--input-bg); color: var(--text-primary); border-radius: 4px; font-size: 10px;">${lang}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }
            
            // Projects Section
            if (structuredCv.projects && structuredCv.projects.length > 0) {
                html += `
                    <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Projects</h4>
                        ${structuredCv.projects.map(proj => `
                            <div style="margin-bottom: 8px; padding: 8px; background: var(--input-bg); border-radius: 6px;">
                                <div style="font-weight: 600; font-size: 11px; color: var(--text-primary); margin-bottom: 4px;">
                                    ${proj.name || ''}${proj.technologies && proj.technologies.length > 0 ? ' • ' + proj.technologies.join(', ') : ''}
                                </div>
                                ${proj.description ? `<p style="font-size: 10px; line-height: 1.5; color: var(--text-primary);">${proj.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            // Certifications Section
            if (structuredCv.certifications && structuredCv.certifications.length > 0) {
                html += `
                    <div style="margin-bottom: 16px;">
                        <h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Certifications</h4>
                        ${structuredCv.certifications.map(cert => `
                            <div style="margin-bottom: 6px; font-size: 10px; color: var(--text-primary);">
                                <strong>${cert.name || ''}</strong>${cert.issuer ? ' • ' + cert.issuer : ''}${cert.date ? ' • ' + cert.date : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            cvModularDisplay.innerHTML = html || '<p style="font-size: 11px; color: var(--text-secondary);">No CV content available</p>';
        } else if (rawContent) {
            // Fallback: Display raw content in a readable format
            const lines = rawContent.split('\n');
            let html = '<div style="font-size: 11px; line-height: 1.6; color: var(--text-primary);">';
            
            lines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) {
                    html += '<br>';
                } else if (trimmed === trimmed.toUpperCase() && trimmed.length < 50 && trimmed.length > 2) {
                    // Section header
                    html += `<h4 style="font-size: 12px; font-weight: 600; color: var(--accent-color); margin: 16px 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">${trimmed}</h4>`;
                } else {
                    html += `<p style="margin: 4px 0;">${line}</p>`;
                }
            });
            
            html += '</div>';
            cvModularDisplay.innerHTML = html;
        } else {
            cvModularDisplay.innerHTML = '<p style="font-size: 11px; color: var(--text-secondary);">No CV content available</p>';
        }
    }
    
    // Helper function to apply suggestions to structured CV JSON object
    function applySuggestionsToStructuredCv(structuredCv) {
        if (!currentCvSuggestions || !currentCvSuggestions.suggestions || !structuredCv) {
            return structuredCv;
        }
        
        // Clone the structured CV to avoid mutating original
        const enhancedCv = JSON.parse(JSON.stringify(structuredCv));
        
        // Apply high-priority suggestions to structured CV
        currentCvSuggestions.suggestions
            .filter(s => s.priority === 'high')
            .forEach(suggestion => {
                if (suggestion.type === 'add' && suggestion.section) {
                    const section = suggestion.section.toLowerCase();
                    
                    // Get suggestion text safely
                    const suggestionText = typeof suggestion.suggestion === 'string' 
                        ? suggestion.suggestion 
                        : (typeof suggestion.example === 'string' 
                            ? suggestion.example 
                            : (suggestion.example?.improved || suggestion.example?.text || String(suggestion.example || suggestion.suggestion || '')));
                    
                    // Apply to appropriate section
                    if (section === 'skills' && enhancedCv.skills) {
                        if (!enhancedCv.skills.technical) enhancedCv.skills.technical = [];
                        // Extract skill names from suggestion text
                        const skillMatch = suggestionText.match(/(?:add|include|mention)\s+['"]?([^'"]+)['"]?/i);
                        if (skillMatch && skillMatch[1]) {
                            const skills = skillMatch[1].split(/[,\s]+and\s+/i).map(s => s.trim()).filter(s => s);
                            skills.forEach(skill => {
                                if (!enhancedCv.skills.technical.includes(skill)) {
                                    enhancedCv.skills.technical.push(skill);
                                }
                            });
                        }
                    } else if (section === 'experience' && enhancedCv.experience && enhancedCv.experience.length > 0) {
                        // Add to most recent experience
                        const latestExp = enhancedCv.experience[0];
                        if (!latestExp.achievements) latestExp.achievements = [];
                        if (suggestionText.trim().length > 0) {
                            latestExp.achievements.push(suggestionText.trim());
                        }
                    } else if (section === 'summary' && enhancedCv.summary) {
                        // Append to summary
                        enhancedCv.summary += ' ' + suggestionText.trim();
                    } else if (section === 'projects' && enhancedCv.projects) {
                        // Add new project if suggested
                        if (suggestionText.trim().length > 0) {
                            if (!enhancedCv.projects) enhancedCv.projects = [];
                            enhancedCv.projects.push({
                                name: 'Suggested Project',
                                description: suggestionText.trim(),
                                technologies: []
                            });
                        }
                    }
                } else if (suggestion.type === 'modify' && suggestion.section) {
                    // For modify suggestions, update existing content
                    const section = suggestion.section.toLowerCase();
                    const exampleText = typeof suggestion.example === 'string' 
                        ? suggestion.example 
                        : (suggestion.example?.improved || suggestion.example?.text || String(suggestion.example || ''));
                    
                    if (exampleText && exampleText.includes('Improved:')) {
                        const improvedMatch = exampleText.match(/Improved:\s*(.+)/);
                        if (improvedMatch && improvedMatch[1]) {
                            if (section === 'summary' && enhancedCv.summary) {
                                enhancedCv.summary = improvedMatch[1].trim();
                            } else if (section === 'experience' && enhancedCv.experience && enhancedCv.experience.length > 0) {
                                // Update most recent experience description
                                enhancedCv.experience[0].description = improvedMatch[1].trim();
                            }
                        }
                    }
                }
            });
        
        return enhancedCv;
    }
    
    // Helper function to convert structured CV back to text
    function structuredCvToText(structuredCv) {
        if (!structuredCv) return '';
        
        let text = '';
        
        // Personal Info
        if (structuredCv.personalInfo) {
            const info = structuredCv.personalInfo;
            if (info.name) text += info.name + '\n';
            const contact = [];
            if (info.email) contact.push(info.email);
            if (info.phone) contact.push(info.phone);
            if (info.location) contact.push(info.location);
            if (info.linkedin) contact.push(info.linkedin);
            if (contact.length > 0) text += contact.join(' | ') + '\n\n';
        }
        
        // Summary
        if (structuredCv.summary) {
            text += 'PROFESSIONAL SUMMARY\n' + structuredCv.summary + '\n\n';
        }
        
        // Experience
        if (structuredCv.experience && structuredCv.experience.length > 0) {
            text += 'PROFESSIONAL EXPERIENCE\n';
            structuredCv.experience.forEach(exp => {
                text += `${exp.title || ''}${exp.company ? ' | ' + exp.company : ''}${exp.location ? ' | ' + exp.location : ''}${exp.startDate || exp.endDate ? ' | ' + (exp.startDate || '') + ' - ' + (exp.endDate || 'Present') : ''}\n`;
                if (exp.description) text += exp.description + '\n';
                if (exp.achievements && exp.achievements.length > 0) {
                    exp.achievements.forEach(ach => {
                        text += '• ' + ach + '\n';
                    });
                }
                text += '\n';
            });
        }
        
        // Education
        if (structuredCv.education && structuredCv.education.length > 0) {
            text += 'EDUCATION\n';
            structuredCv.education.forEach(edu => {
                text += `${edu.degree || ''}${edu.school ? ' | ' + edu.school : ''}${edu.location ? ' | ' + edu.location : ''}${edu.graduationDate ? ' | ' + edu.graduationDate : ''}\n`;
                if (edu.gpa || edu.honors) {
                    const details = [];
                    if (edu.gpa) details.push('GPA: ' + edu.gpa);
                    if (edu.honors) details.push(edu.honors);
                    text += details.join(' | ') + '\n';
                }
                text += '\n';
            });
        }
        
        // Skills
        if (structuredCv.skills) {
            text += 'SKILLS\n';
            const skillParts = [];
            if (structuredCv.skills.technical && structuredCv.skills.technical.length > 0) {
                skillParts.push('Technical: ' + structuredCv.skills.technical.join(', '));
            }
            if (structuredCv.skills.soft && structuredCv.skills.soft.length > 0) {
                skillParts.push('Soft Skills: ' + structuredCv.skills.soft.join(', '));
            }
            if (structuredCv.skills.languages && structuredCv.skills.languages.length > 0) {
                skillParts.push('Languages: ' + structuredCv.skills.languages.join(', '));
            }
            text += skillParts.join('\n') + '\n\n';
        }
        
        // Projects
        if (structuredCv.projects && structuredCv.projects.length > 0) {
            text += 'PROJECTS\n';
            structuredCv.projects.forEach(proj => {
                text += `${proj.name || ''}${proj.technologies && proj.technologies.length > 0 ? ' | ' + proj.technologies.join(', ') : ''}\n`;
                if (proj.description) text += proj.description + '\n';
                text += '\n';
            });
        }
        
        // Certifications
        if (structuredCv.certifications && structuredCv.certifications.length > 0) {
            text += 'CERTIFICATIONS\n';
            structuredCv.certifications.forEach(cert => {
                text += `${cert.name || ''}${cert.issuer ? ' | ' + cert.issuer : ''}${cert.date ? ' | ' + cert.date : ''}\n`;
            });
            text += '\n';
        }
        
        return text.trim();
    }
    
    // Helper function to apply suggestions to CV content (uses structured CV if available)
    function applySuggestionsToCv(cvText) {
        if (!currentCvSuggestions || !currentCvSuggestions.suggestions) {
            return { cvText: cvText, aiEdits: [] };
        }
        
        // If we have a structured CV, apply suggestions to it first
        if (currentCvStructured || (currentCvData && currentCvData.structured)) {
            const structuredCv = currentCvStructured || currentCvData.structured;
            const enhancedStructured = applySuggestionsToStructuredCv(structuredCv);
            
            // Convert back to text
            const enhancedCvText = structuredCvToText(enhancedStructured);
            
            // Calculate AI edits (everything that was added)
            const aiEdits = [];
            const originalText = structuredCvToText(structuredCv);
            const addedLength = enhancedCvText.length - originalText.length;
            
            if (addedLength > 0) {
                aiEdits.push({
                    start: originalText.length,
                    end: enhancedCvText.length,
                    type: 'add',
                    content: enhancedCvText.substring(originalText.length)
                });
            }
            
            // Update stored structured CV
            currentCvStructured = enhancedStructured;
            if (currentCvData) {
                currentCvData.structured = enhancedStructured;
            }
            
            return { cvText: enhancedCvText, aiEdits: aiEdits };
        }
        
        // Fallback to text-based approach if no structured CV
        let enhancedCvText = cvText;
        const aiEdits = [];
        
        // Apply high-priority suggestions
        currentCvSuggestions.suggestions
            .filter(s => s.priority === 'high')
            .forEach(suggestion => {
                if (suggestion.type === 'add' && suggestion.section) {
                    // Check if this section already exists in CV
                    const sectionHeader = `[${suggestion.section.toUpperCase()}]`;
                    const sectionRegex = new RegExp(`\\[${suggestion.section.toUpperCase()}\\]`, 'i');
                    
                    // Get suggestion text safely (handle different data types)
                    const suggestionText = typeof suggestion.suggestion === 'string' 
                        ? suggestion.suggestion 
                        : (typeof suggestion.example === 'string' 
                            ? suggestion.example 
                            : (suggestion.example?.improved || suggestion.example?.text || String(suggestion.example || suggestion.suggestion || '')));
                    
                    if (!sectionRegex.test(enhancedCvText)) {
                        // Section doesn't exist, add it
                        const addition = `\n\n${sectionHeader}\n${suggestionText}`;
                        const startPos = enhancedCvText.length;
                        enhancedCvText += addition;
                        const endPos = enhancedCvText.length;
                        
                        aiEdits.push({
                            start: startPos,
                            end: endPos,
                            type: 'add',
                            section: suggestion.section,
                            content: addition
                        });
                    } else {
                        // Section exists, add content to it
                        const sectionMatch = enhancedCvText.match(new RegExp(`(${sectionHeader}[^\\[]*)`, 'i'));
                        if (sectionMatch && suggestionText.trim().length > 0) {
                            const insertPos = sectionMatch.index + sectionMatch[0].length;
                            const addition = `\n${suggestionText}`;
                            enhancedCvText = enhancedCvText.slice(0, insertPos) + addition + enhancedCvText.slice(insertPos);
                            
                            aiEdits.push({
                                start: insertPos,
                                end: insertPos + addition.length,
                                type: 'add',
                                section: suggestion.section,
                                content: addition
                            });
                        }
                    }
                } else if (suggestion.type === 'modify') {
                    // For modify suggestions, extract the improved version
                    // Ensure example is a string - handle all possible types
                    let exampleText = '';
                    if (suggestion.example) {
                        if (typeof suggestion.example === 'string') {
                            exampleText = suggestion.example;
                        } else if (typeof suggestion.example === 'object') {
                            // Handle object with improved/text properties
                            exampleText = suggestion.example.improved || suggestion.example.text || suggestion.example.content || '';
                            // If still not a string, convert to string
                            if (typeof exampleText !== 'string') {
                                exampleText = String(exampleText || '');
                            }
                        } else {
                            // Convert to string for any other type
                            exampleText = String(suggestion.example || '');
                        }
                    }
                    
                    // Only proceed if we have a valid string
                    if (exampleText && typeof exampleText === 'string' && exampleText.trim().length > 0) {
                        // Check if it contains "Improved:" marker
                        if (typeof exampleText.includes === 'function' && exampleText.includes('Improved:')) {
                            const improvedMatch = exampleText.match(/Improved:\s*(.+)/);
                            if (improvedMatch && improvedMatch[1]) {
                                const addition = `\n\n[SUGGESTED IMPROVEMENT]\n${improvedMatch[1].trim()}`;
                                const startPos = enhancedCvText.length;
                                enhancedCvText += addition;
                                const endPos = enhancedCvText.length;
                                
                                aiEdits.push({
                                    start: startPos,
                                    end: endPos,
                                    type: 'modify',
                                    section: suggestion.section,
                                    content: addition
                                });
                            }
                        } else {
                            // If example doesn't have "Improved:" prefix, use it directly
                            const addition = `\n\n[SUGGESTED IMPROVEMENT]\n${exampleText.trim()}`;
                            const startPos = enhancedCvText.length;
                            enhancedCvText += addition;
                            const endPos = enhancedCvText.length;
                            
                            aiEdits.push({
                                start: startPos,
                                end: endPos,
                                type: 'modify',
                                section: suggestion.section,
                                content: addition
                            });
                        }
                    }
                }
            });
        
        return { cvText: enhancedCvText, aiEdits: aiEdits };
    }
    
    // Download CV Button - COMMENTED OUT FOR NOW
    /*
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', async () => {
            // Check if we have CV data (structured or raw)
            if (!currentCvData && !finalCvStructured && !currentCvStructured) {
                alert('No CV content to download. Please upload a CV or use LinkedIn profile first.');
                return;
            }
            
            try {
                const format = cvDownloadFormat ? cvDownloadFormat.value : 'pdf';
                const jobTitle = currentJobData?.jobTitle || currentJobData?.title || 'job';
                
                // Disable button during generation
                downloadCvBtn.disabled = true;
                downloadCvBtn.textContent = 'Generating...';
                
                const currentApiKey = await getApiKey();
                
                // Use final structured CV if available (has AI additions), otherwise use current structured CV
                let structuredCvToUse = finalCvStructured || currentCvStructured || (currentCvData && currentCvData.structured);
                
                // Calculate AI edits for highlighting (compare original vs final)
                let aiEdits = [];
                if (finalCvStructured && currentCvStructured) {
                    // Compare original structured CV with final to find additions
                    const originalText = structuredCvToText(currentCvStructured);
                    const finalText = structuredCvToText(finalCvStructured);
                    const addedLength = finalText.length - originalText.length;
                    
                    if (addedLength > 0) {
                        aiEdits.push({
                            start: originalText.length,
                            end: finalText.length,
                            type: 'add',
                            content: finalText.substring(originalText.length)
                        });
                    }
                }
                
                // Prepare request body
                const requestBody = {
                    format: format,
                    jobTitle: jobTitle,
                    aiEdits: aiEdits
                };
                
                // If we have structured CV, send it; otherwise send raw content
                if (structuredCvToUse) {
                    requestBody.structuredCv = structuredCvToUse;
                    requestBody.useStructuredCv = true;
                    log(`[CV] Using structured CV with ${Object.keys(structuredCvToUse).length} sections`);
                } else if (currentCvData && currentCvData.content) {
                    requestBody.cvContent = currentCvData.content;
                    requestBody.useStructuredCv = false;
                    log(`[CV] Using raw CV content (${currentCvData.content.length} chars)`);
                } else {
                    throw new Error('No CV data available for download');
                }
                
                const response = await fetch(`${BACKEND_URL}/api/generate-cv-file`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': currentApiKey
                    },
                    body: JSON.stringify(requestBody)
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to generate CV file');
                }
                
                // Get file blob
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                
                // Create download link
                const a = document.createElement('a');
                a.href = url;
                const fileName = `optimized_cv_${jobTitle.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.${format}`;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                log(`[CV] ✓ CV downloaded as ${format.toUpperCase()}`);
                
            } catch (error) {
                log(`[CV] ✗ Error: ${error.message}`);
                alert('Failed to generate CV file: ' + error.message);
            } finally {
                // Re-enable button
                downloadCvBtn.disabled = false;
                downloadCvBtn.textContent = '📥 Download CV';
            }
        });
    }
    */
    
    // Regenerate Analysis Button
    if (regenerateAnalysisBtn) {
        regenerateAnalysisBtn.addEventListener('click', () => {
            analyzeCvAgainstJob();
        });
    }
    
    // CV Editor removed - CV is now displayed in modular format only
    
    // Load job applications library
    async function loadJobApplicationsLibrary() {
        try {
            const currentApiKey = await getApiKey();
            const response = await fetch(`${BACKEND_URL}/api/job-analyses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': currentApiKey
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to load job analyses');
            }
            
            const data = await response.json();
            
            if (jobApplicationsLibrary) {
                if (data.analyses && data.analyses.length > 0) {
                    jobApplicationsLibrary.innerHTML = data.analyses.map(job => `
                        <div class="content-analysis-card" style="margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                                <div>
                                    <h4 style="margin: 0 0 4px 0; color: var(--text-primary);">${job.job_title || 'Untitled Job'}</h4>
                                    <p style="margin: 0; color: var(--text-secondary); font-size: 12px;">${job.company_name || 'Unknown Company'} • ${job.location || 'Unknown Location'}</p>
                                </div>
                                <small style="color: var(--text-secondary);">${new Date(job.created_at).toLocaleDateString()}</small>
                            </div>
                            ${job.skills_required && job.skills_required.length > 0 ? `
                                <div style="margin-top: 8px;">
                                    <strong style="font-size: 11px; color: var(--text-secondary);">Skills:</strong>
                                    <div style="margin-top: 4px;">
                                        ${job.skills_required.slice(0, 5).map(skill => `<span class="topic-tag">${skill}</span>`).join('')}
                                        ${job.skills_required.length > 5 ? `<span class="topic-tag">+${job.skills_required.length - 5} more</span>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                            <div style="margin-top: 8px;">
                                <a href="${job.job_url}" target="_blank" style="color: var(--accent-color); font-size: 12px; text-decoration: none;">View Job →</a>
                            </div>
                        </div>
                    `).join('');
                } else {
                    jobApplicationsLibrary.innerHTML = '<p class="empty-state">No saved job analyses yet. Analyze a job to get started.</p>';
                }
            }
        } catch (error) {
            log(`[JobLibrary] ✗ Error: ${error.message}`);
            if (jobApplicationsLibrary) {
                jobApplicationsLibrary.innerHTML = '<p class="empty-state">Error loading job analyses. Please try again.</p>';
            }
        }
    }
    
    // Auto-load LinkedIn profile as CV if available
    async function loadLinkedInProfileAsCv() {
        try {
            // Check for sender_profile_cache (the key used when capturing profile)
            const stored = await chrome.storage.local.get(['sender_profile_cache', 'sender_profile_structured']);
            
            // Use sender_profile_cache if available (raw profile text)
            if (stored.sender_profile_cache && stored.sender_profile_cache.trim().length > 0) {
                currentCvData = {
                    source: 'linkedin',
                    content: stored.sender_profile_cache,
                    structured: stored.sender_profile_structured || null
                };
                log('[CV] ✓ LinkedIn profile loaded as CV (' + stored.sender_profile_cache.length + ' chars)');
                return true;
            } else {
                log('[CV] ⚠ No LinkedIn profile found in storage. Keys checked: sender_profile_cache');
                return false;
            }
        } catch (error) {
            log('[CV] ✗ Error loading LinkedIn profile: ' + error.message);
            return false;
        }
    }
    
    // Proceed with CV Analysis Button
    if (proceedWithCvBtn) {
        proceedWithCvBtn.addEventListener('click', async () => {
            if (!currentJobData || !currentCvData) {
                alert('Please analyze a job and select a CV source first');
                return;
            }
            
            // Switch to CV Editor tab
            showTab('tab-cv-edit');
            // Trigger CV analysis
            await analyzeCvAgainstJob();
        });
    }
    
    // Initialize: Load LinkedIn profile if available
    (async () => {
        await loadLinkedInProfileAsCv();
        // Check if CV is ready (in case job was already analyzed)
        checkCvReady();
    })();
    
    // Initialize: Show marketing product by default
    showProduct('marketing');
    
    // Load library on initialization if on results tab
    if (document.getElementById('tab-results-content') && !document.getElementById('tab-results-content').classList.contains('hidden')) {
        loadContentLibrary();
    }
});