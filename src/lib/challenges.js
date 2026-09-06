/**
 * PhishGuard — Training Challenge Data
 * 50+ scenarios across multiple challenge types
 */

// ═══════════════════════════════════════════════════════════════════════════
// EMAIL TRIAGE CHALLENGES
// ═══════════════════════════════════════════════════════════════════════════

export const emailChallenges = [
  {
    id: 'email-1',
    difficulty: 'easy',
    sender: 'security@paypa1.com',
    subject: 'Your account has been limited',
    body: 'Dear Customer,\n\nWe noticed unusual activity on your account. Please verify your identity within 24 hours or your account will be permanently suspended.\n\nClick here to verify: http://paypa1-secure.com/verify\n\nPayPal Security Team',
    isPhishing: true,
    indicators: [
      'Sender uses "paypa1" (number 1 instead of letter l)',
      'Creates urgency with "24 hours" deadline',
      'Generic greeting "Dear Customer"',
      'Suspicious link domain "paypa1-secure.com"',
      'Threatening language about suspension'
    ],
    explanation: 'This is a classic phishing email. The sender domain uses number "1" instead of letter "l" in PayPal. The urgency and threats are manipulation tactics.'
  },
  {
    id: 'email-2',
    difficulty: 'easy',
    sender: 'noreply@amazon.com',
    subject: 'Your Amazon.com order #402-3817395-2947183',
    body: 'Hello John,\n\nYour order #402-3817395-2947183 has been shipped and will arrive by Thursday.\n\nTrack your package: https://www.amazon.com/gp/your-account/order-details?orderID=402-3817395-2947183\n\nThank you for shopping with us.\n\nAmazon.com',
    isPhishing: false,
    indicators: [],
    explanation: 'This is a legitimate Amazon shipping notification. It uses the correct domain, includes a specific order number, and the link goes to amazon.com.'
  },
  {
    id: 'email-3',
    difficulty: 'medium',
    sender: 'admin@microsoft-365-security.com',
    subject: 'Action Required: Password Expires Today',
    body: 'Dear User,\n\nYour Microsoft 365 password will expire today. To maintain access to your email and files, please update your password immediately.\n\nUpdate Password Now: https://microsoft-365-security.com/update\n\nIf you did not request this change, please ignore this email.\n\nMicrosoft 365 Support',
    isPhishing: true,
    indicators: [
      'Domain "microsoft-365-security.com" is not microsoft.com',
      'Generic "Dear User" greeting',
      'False urgency about password expiry',
      'Microsoft would use microsoft.com or office.com domains',
      'The link domain matches the fake sender domain'
    ],
    explanation: 'Microsoft would never send emails from "microsoft-365-security.com". Official communications come from microsoft.com or office365.com domains.'
  },
  {
    id: 'email-4',
    difficulty: 'easy',
    sender: 'support@netflix.com',
    subject: 'Your Netflix membership payment was declined',
    body: 'Hi Sarah,\n\nWe were unable to process your payment for the billing period ending 03/15/2025. Your current payment method on file has expired.\n\nTo update your payment details, visit your Account page at netflix.com.\n\nIf you need help, visit our Help Center.\n\nThe Netflix Team',
    isPhishing: false,
    indicators: [],
    explanation: 'This appears to be a legitimate Netflix email. It uses the correct domain, addresses the user by name, and directs them to visit netflix.com directly rather than including a suspicious link.'
  },
  {
    id: 'email-5',
    difficulty: 'medium',
    sender: 'no-reply@appleid.apple.com.verify-account.xyz',
    subject: 'Your Apple ID was used to sign in to iCloud',
    body: 'Dear Apple Customer,\n\nYour Apple ID (j***@gmail.com) was used to sign in to iCloud via a web browser.\n\nDate: March 12, 2025\nBrowser: Chrome\nLocation: Moscow, Russia\n\nIf this wasn\'t you, click here immediately to secure your account:\nhttps://appleid.apple.com.verify-account.xyz/secure\n\nApple Support',
    isPhishing: true,
    indicators: [
      'Domain is verify-account.xyz, NOT apple.com',
      'Uses subdomain "appleid.apple.com" to appear legitimate',
      'Creates fear with "Moscow, Russia" location',
      'Suspicious TLD (.xyz)',
      'Urgency with "immediately"'
    ],
    explanation: 'The actual domain is "verify-account.xyz" — "appleid.apple.com" is merely a subdomain prefix to trick users. Always read the root domain (before the TLD).'
  },
  {
    id: 'email-6',
    difficulty: 'hard',
    sender: 'donotreply@chase.com',
    subject: 'Important: Unusual sign-in activity',
    body: 'Hello James,\n\nWe detected a sign-in to your Chase account from an unrecognized device.\n\nDevice: iPhone 15\nLocation: New York, NY\nTime: March 12, 2025 3:42 PM EST\n\nIf this was you, no action is needed. If not, please review your account activity at chase.com/security.\n\nChase Bank',
    isPhishing: false,
    indicators: [],
    explanation: 'This is a legitimate security alert. It comes from chase.com, uses personalized greeting, provides specific details, and directs users to the official domain without embedded links.'
  },
  {
    id: 'email-7',
    difficulty: 'hard',
    sender: 'service@intl-paypal.com',
    subject: 'Receipt for Your Payment to Steam Games',
    body: 'Hello,\n\nYou sent a payment of $149.99 USD to Steam Games (support@steampowered.com).\n\nTransaction ID: 4YN82947XR285941B\nDate: March 12, 2025\n\nIf you didn\'t make this purchase, dispute it here: https://intl-paypal.com/disputes\n\nPayPal',
    isPhishing: true,
    indicators: [
      'Domain "intl-paypal.com" is not the real paypal.com',
      'Creates panic with a large unauthorized purchase',
      'Dispute link goes to fake domain',
      'PayPal official domain is paypal.com, not intl-paypal.com',
      'Generic "Hello" greeting'
    ],
    explanation: 'This uses a fake payment notification to panic users into clicking the dispute link. The domain "intl-paypal.com" is not PayPal\'s official domain.'
  },
  {
    id: 'email-8',
    difficulty: 'medium',
    sender: 'notifications@github.com',
    subject: '[GitHub] A third-party OAuth application has been added',
    body: 'Hey @johndev,\n\nA third-party OAuth application (CI Pipeline Tool) was recently authorized to access your GitHub account.\n\nIf you did not authorize this, you can review and revoke access in your settings:\nhttps://github.com/settings/applications\n\n— GitHub',
    isPhishing: false,
    indicators: [],
    explanation: 'This is a legitimate GitHub notification. It uses the correct domain, @mentions the user, and the settings link goes to github.com.'
  },
  {
    id: 'email-9',
    difficulty: 'hard',
    sender: 'hr@company-benefits2025.com',
    subject: 'Open Enrollment: Update Your Benefits Now',
    body: 'Dear Employee,\n\nOpen enrollment for 2025 benefits begins today. You must update your selections by March 31, 2025.\n\nNew this year:\n- Enhanced dental coverage\n- Increased 401(k) match to 6%\n- New wellness program\n\nLog in to update: https://company-benefits2025.com/enroll\n\nHuman Resources',
    isPhishing: true,
    indicators: [
      'Generic domain "company-benefits2025.com" not your actual company',
      'Generic "Dear Employee" greeting',
      'Year in domain name is suspicious',
      'Real HR would use your company\'s actual domain',
      'No specific company name mentioned'
    ],
    explanation: 'Spear phishing targeting employees. Real HR communications come from your company\'s official domain, not a generic benefits domain.'
  },
  {
    id: 'email-10',
    difficulty: 'easy',
    sender: 'winner@lottery-international.xyz',
    subject: 'CONGRATULATIONS! You Won $1,000,000!',
    body: 'CONGRATULATIONS!!!\n\nYou have been selected as the WINNER of our International Email Lottery!\n\nPrize: $1,000,000.00 USD\nRef Number: IL/2025/0312\n\nTo claim your prize, send your full name, address, and bank details to:\nclaims@lottery-international.xyz\n\nACT NOW before your prize expires!\n\nLottery Commission',
    isPhishing: true,
    indicators: [
      'Unsolicited lottery win',
      'Requests personal and bank information',
      'Suspicious .xyz domain',
      'ALL CAPS and excessive exclamation marks',
      'Creates urgency with expiration threat',
      'No legitimate lottery contacts winners by email'
    ],
    explanation: 'Classic 419 scam/advance fee fraud. No legitimate lottery contacts winners via email or asks for bank details.'
  },
  {
    id: 'email-11',
    difficulty: 'medium',
    sender: 'support@dropbox.com',
    subject: 'John shared "Q4 Financial Report.pdf" with you',
    body: 'Hi there,\n\nJohn Smith (john.smith@acmecorp.com) shared a file with you.\n\nQ4 Financial Report.pdf\n\nView file: https://www.dropbox.com/s/abc123/Q4_Financial_Report.pdf\n\nEnjoy!\n— The Dropbox Team',
    isPhishing: false,
    indicators: [],
    explanation: 'This is a legitimate Dropbox file sharing notification. The link goes to the official dropbox.com domain.'
  },
  {
    id: 'email-12',
    difficulty: 'hard',
    sender: 'security-alert@google.com.account-review.net',
    subject: 'Critical Security Alert for your Google Account',
    body: 'Someone just used your password to try to sign in to your Google Account.\n\nDetails:\nDate: March 12, 2025 7:23 PM\nDevice: Windows Computer\nLocation: Lagos, Nigeria\n\nGoogle blocked this sign-in attempt. Review your account activity:\nhttps://google.com.account-review.net/security\n\nIf this was you, you can ignore this message.\n\nThe Google Accounts Team',
    isPhishing: true,
    indicators: [
      'Actual domain is account-review.net, NOT google.com',
      'google.com is a subdomain of account-review.net',
      'Uses fear with "Lagos, Nigeria" location',
      'Link goes to account-review.net, not google.com',
      'Very convincing format mimics real Google alerts'
    ],
    explanation: 'Extremely deceptive. The domain "google.com.account-review.net" is actually "account-review.net" with "google.com" as a subdomain. Always identify the root domain.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// URL DETECTIVE CHALLENGES
// ═══════════════════════════════════════════════════════════════════════════

export const urlChallenges = [
  {
    id: 'url-1',
    difficulty: 'easy',
    question: 'Which URL is the REAL PayPal login page?',
    options: [
      { url: 'https://www.paypal.com/signin', isReal: true },
      { url: 'https://www.paypa1.com/signin', isReal: false },
      { url: 'https://paypal-login.com/signin', isReal: false },
      { url: 'https://www.pay-pal.com/signin', isReal: false }
    ],
    explanation: 'Only paypal.com is the real domain. "paypa1" uses number 1 instead of letter l, "paypal-login.com" is a different domain entirely, and "pay-pal.com" has a hyphen.'
  },
  {
    id: 'url-2',
    difficulty: 'easy',
    question: 'Which URL would take you to the REAL Google login?',
    options: [
      { url: 'https://accounts.google.com/signin', isReal: true },
      { url: 'https://google.account-verify.com/signin', isReal: false },
      { url: 'https://accounts.g00gle.com/signin', isReal: false },
      { url: 'https://google-accounts.com/signin', isReal: false }
    ],
    explanation: 'Only accounts.google.com is legitimate. "g00gle" uses zeros, and the others are different domains masquerading as Google.'
  },
  {
    id: 'url-3',
    difficulty: 'medium',
    question: 'Which is the legitimate Apple website?',
    options: [
      { url: 'https://appleid.apple.com/account', isReal: true },
      { url: 'https://apple.com.secure-id.xyz/account', isReal: false },
      { url: 'https://appleid-apple.com/account', isReal: false },
      { url: 'https://www.аpple.com/account', isReal: false }
    ],
    explanation: 'Only appleid.apple.com is real. "secure-id.xyz" is the actual domain in option 2, option 3 uses a hyphen, and option 4 uses a Cyrillic "а" (homograph attack).'
  },
  {
    id: 'url-4',
    difficulty: 'medium',
    question: 'Which Microsoft login URL is authentic?',
    options: [
      { url: 'https://login.microsoftonline.com/common/oauth2', isReal: true },
      { url: 'https://login.microsoft.com-online.net/common/oauth2', isReal: false },
      { url: 'https://microsoft-online.login.com/common/oauth2', isReal: false },
      { url: 'https://login.microsoft0nline.com/common/oauth2', isReal: false }
    ],
    explanation: 'Only login.microsoftonline.com is the official Azure AD login. Others use similar-looking but different domains.'
  },
  {
    id: 'url-5',
    difficulty: 'hard',
    question: 'Which Amazon URL is legitimate?',
    options: [
      { url: 'https://www.amazon.com/gp/css/order-history', isReal: true },
      { url: 'https://www.amazon.com.order-status.info/gp/css/order-history', isReal: false },
      { url: 'https://amazon-orders.com/gp/css/order-history', isReal: false },
      { url: 'https://www.amaz0n.com/gp/css/order-history', isReal: false }
    ],
    explanation: 'Only www.amazon.com is the real domain. The second option\'s actual domain is "order-status.info" with amazon.com as a subdomain.'
  },
  {
    id: 'url-6',
    difficulty: 'hard',
    question: 'Which banking URL is safe to use?',
    options: [
      { url: 'https://secure.chase.com/web/auth/dashboard', isReal: true },
      { url: 'https://chase.secure-banking.com/web/auth/dashboard', isReal: false },
      { url: 'https://secure-chase.com/web/auth/dashboard', isReal: false },
      { url: 'http://192.168.1.100/chase/web/auth/dashboard', isReal: false }
    ],
    explanation: 'Only secure.chase.com is a subdomain of the real chase.com. The IP address version is extremely suspicious — banks never use IP addresses.'
  },
  {
    id: 'url-7',
    difficulty: 'medium',
    question: 'Which Netflix URL is genuine?',
    options: [
      { url: 'https://www.netflix.com/browse', isReal: true },
      { url: 'https://www.netflix-login.com/browse', isReal: false },
      { url: 'https://netflix.com.streaming-verify.tk/browse', isReal: false },
      { url: 'https://www.netfliх.com/browse', isReal: false }
    ],
    explanation: 'Only www.netflix.com is real. Option 4 uses a Cyrillic "х" instead of Latin "x" — a homograph attack that is nearly impossible to detect visually.'
  },
  {
    id: 'url-8',
    difficulty: 'hard',
    question: 'Identify the real LinkedIn URL:',
    options: [
      { url: 'https://www.linkedin.com/in/johndoe', isReal: true },
      { url: 'https://www.linkedin.com@evil.com/in/johndoe', isReal: false },
      { url: 'https://linkedin.com.profile-view.ga/in/johndoe', isReal: false },
      { url: 'https://www.1inkedin.com/in/johndoe', isReal: false }
    ],
    explanation: 'Option 2 uses the @ symbol trick — everything before @ is treated as credentials, so the actual destination is evil.com. Option 4 uses "1" instead of "l".'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// WEBSITE INSPECTOR CHALLENGES
// ═══════════════════════════════════════════════════════════════════════════

export const inspectorChallenges = [
  {
    id: 'inspect-1',
    difficulty: 'easy',
    title: 'Fake PayPal Login Page',
    description: 'Find all the phishing indicators on this simulated PayPal login page.',
    url: 'http://paypa1-secure.com/login',
    indicators: [
      { id: 'ind-1', name: 'Wrong Domain', description: 'Domain is paypa1-secure.com, not paypal.com', location: 'URL Bar', points: 20 },
      { id: 'ind-2', name: 'No HTTPS', description: 'Page uses HTTP instead of HTTPS', location: 'URL Bar', points: 15 },
      { id: 'ind-3', name: 'Misspelled Brand', description: '"paypa1" uses number 1 instead of letter l', location: 'URL Bar', points: 25 },
      { id: 'ind-4', name: 'Generic Error Message', description: 'Login form shows "incorrect password" before even typing', location: 'Form Area', points: 10 },
      { id: 'ind-5', name: 'Missing Footer Links', description: 'Real PayPal has extensive footer links', location: 'Page Footer', points: 10 },
      { id: 'ind-6', name: 'No CAPTCHA', description: 'Real PayPal uses reCAPTCHA on login', location: 'Form Area', points: 10 },
      { id: 'ind-7', name: 'Suspicious Form Action', description: 'Form submits to external domain', location: 'Hidden', points: 10 }
    ],
    timeLimit: 120,
    maxPoints: 100
  },
  {
    id: 'inspect-2',
    difficulty: 'medium',
    title: 'Fake Google Sign-In',
    description: 'Identify the phishing signs on this Google login clone.',
    url: 'https://accounts.g00gle-signin.com/login',
    indicators: [
      { id: 'ind-1', name: 'Wrong Domain', description: 'Domain is g00gle-signin.com with zeros instead of o', location: 'URL Bar', points: 20 },
      { id: 'ind-2', name: 'Old Google Logo', description: 'Using an outdated Google logo version', location: 'Page Header', points: 10 },
      { id: 'ind-3', name: 'Missing "Create Account"', description: 'Real Google always has create account option', location: 'Below Form', points: 10 },
      { id: 'ind-4', name: 'No Language Selector', description: 'Real Google has language options at bottom', location: 'Page Footer', points: 10 },
      { id: 'ind-5', name: 'Asks Password Immediately', description: 'Real Google asks email first, then password on next screen', location: 'Form Area', points: 20 },
      { id: 'ind-6', name: 'Missing Privacy Links', description: 'No Terms/Privacy/Help links at bottom', location: 'Page Footer', points: 10 },
      { id: 'ind-7', name: 'Suspicious Certificate', description: 'SSL certificate is from free provider, not Google', location: 'URL Bar', points: 10 },
      { id: 'ind-8', name: 'Hidden iFrame', description: 'Page loads content from another domain in hidden iFrame', location: 'Hidden', points: 10 }
    ],
    timeLimit: 150,
    maxPoints: 100
  },
  {
    id: 'inspect-3',
    difficulty: 'hard',
    title: 'Sophisticated Banking Clone',
    description: 'This is a high-quality bank phishing page. Find the subtle indicators.',
    url: 'https://secure.chasebank-online.com/auth',
    indicators: [
      { id: 'ind-1', name: 'Domain Mismatch', description: 'Domain is chasebank-online.com, not chase.com', location: 'URL Bar', points: 20 },
      { id: 'ind-2', name: 'Missing Security Image', description: 'Real Chase shows your personal security image', location: 'Form Area', points: 15 },
      { id: 'ind-3', name: 'No Session Timeout Warning', description: 'Real banking sites show timeout warnings', location: 'Page Header', points: 10 },
      { id: 'ind-4', name: 'CSS Differences', description: 'Font rendering is slightly different from real Chase', location: 'Whole Page', points: 10 },
      { id: 'ind-5', name: 'Missing Mobile App Link', description: 'Real Chase prominently features app download links', location: 'Page Footer', points: 10 },
      { id: 'ind-6', name: 'No FDIC Logo', description: 'Real Chase displays FDIC member logo', location: 'Page Footer', points: 10 },
      { id: 'ind-7', name: 'Form Asks Too Much', description: 'Asks for SSN last 4 digits on login — real Chase doesn\'t', location: 'Form Area', points: 15 },
      { id: 'ind-8', name: 'Hover URL Mismatch', description: 'Links show different URLs on hover than displayed text', location: 'Navigation Links', points: 10 }
    ],
    timeLimit: 180,
    maxPoints: 100
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// KNOWLEDGE BASE ARTICLES
// ═══════════════════════════════════════════════════════════════════════════

export const knowledgeArticles = [
  {
    id: 'kb-1',
    title: 'What is Phishing?',
    category: 'Fundamentals',
    icon: '🎣',
    readTime: '5 min',
    content: `Phishing is a type of social engineering attack where cybercriminals attempt to trick individuals into revealing sensitive information — such as passwords, credit card numbers, or Social Security numbers — by disguising themselves as a trustworthy entity.

**How It Works:**
1. The attacker creates a fake version of a legitimate website or email
2. The victim is lured into interacting with the fake content
3. Any information entered is captured by the attacker
4. The stolen data is used for identity theft, financial fraud, or account takeover

**Key Statistics:**
- 91% of cyberattacks begin with a phishing email
- The average cost of a phishing attack on a mid-sized company is $1.6 million
- Phishing attacks have increased 150% per year since 2019`
  },
  {
    id: 'kb-2',
    title: 'Types of Phishing Attacks',
    category: 'Fundamentals',
    icon: '🔍',
    readTime: '8 min',
    content: `**1. Email Phishing (Deceptive Phishing)**
The most common type. Mass emails impersonating legitimate organizations.

**2. Spear Phishing**
Targeted attacks against specific individuals using personal information gathered from social media or data breaches.

**3. Whaling**
Phishing attacks specifically targeting C-level executives and senior management.

**4. Clone Phishing**
A legitimate email is cloned with malicious links/attachments substituted, then re-sent from a spoofed address.

**5. Vishing (Voice Phishing)**
Phone-based phishing where attackers impersonate banks, IRS, tech support, etc.

**6. Smishing (SMS Phishing)**
Phishing via text messages, often with urgent delivery notifications or account alerts.

**7. Pharming**
DNS poisoning that redirects users to fake websites even when they type the correct URL.

**8. Man-in-the-Middle (MitM)**
Attacker intercepts communication between user and legitimate website in real-time.`
  },
  {
    id: 'kb-3',
    title: 'How to Identify Phishing URLs',
    category: 'Detection',
    icon: '🔗',
    readTime: '6 min',
    content: `**Red Flags in URLs:**

1. **Check the Domain**: Always identify the root domain. In "secure.chase.com", the root is chase.com (legitimate). In "chase.secure-login.com", the root is secure-login.com (fake).

2. **Look for Typosquatting**: paypa1.com (1 vs l), amaz0n.com (0 vs o), microsft.com (missing o)

3. **Watch for Homograph Attacks**: Cyrillic characters that look identical to Latin letters. The domain "аpple.com" with a Cyrillic "а" looks exactly like "apple.com".

4. **Beware of Subdomains**: "login.paypal.com.evil.com" — the actual domain is evil.com, not paypal.com.

5. **Check the Protocol**: Legitimate sites use HTTPS. However, phishing sites can also use HTTPS, so this alone isn't sufficient.

6. **Count the Dots**: Excessive subdomains (more than 3 levels) are suspicious.

7. **Look for IP Addresses**: http://192.168.1.100/paypal — legitimate sites don't use IP addresses.

8. **Watch for @ Symbols**: http://www.paypal.com@evil.com — redirects to evil.com.`
  },
  {
    id: 'kb-4',
    title: 'Password Security Best Practices',
    category: 'Prevention',
    icon: '🔐',
    readTime: '5 min',
    content: `**Creating Strong Passwords:**
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Use passphrases: "correct-horse-battery-staple" is stronger than "P@ssw0rd!"
- Never reuse passwords across sites

**Password Manager Benefits:**
- Generate unique, complex passwords for every account
- Auto-fill prevents entering credentials on fake sites
- Encrypted vault protects all your passwords
- Recommended: Bitwarden, 1Password, KeePassXC

**Two-Factor Authentication (2FA):**
- Always enable 2FA when available
- Use authenticator apps (Google Authenticator, Authy) over SMS
- Hardware keys (YubiKey) provide the strongest protection
- Backup codes should be stored securely offline

**What to Do If Compromised:**
1. Change the password immediately
2. Enable 2FA if not already active
3. Check for unauthorized account activity
4. Report the incident to the service provider`
  },
  {
    id: 'kb-5',
    title: 'Social Engineering Tactics',
    category: 'Psychology',
    icon: '🧠',
    readTime: '7 min',
    content: `Phishing exploits human psychology through these manipulation techniques:

**1. Urgency & Fear**
"Your account will be suspended in 24 hours!" — Creates panic that bypasses critical thinking.

**2. Authority**
Impersonating CEOs, IT departments, or government agencies to leverage trust in authority.

**3. Scarcity**
"Only 3 prizes left!" or "Limited time offer!" — Creates pressure to act without thinking.

**4. Social Proof**
"10,000 people have already verified their accounts" — Leverages herd mentality.

**5. Reciprocity**
"We've given you a free gift card" — Creates obligation to respond.

**6. Familiarity**
Using your name, company, or recent purchases to appear legitimate.

**Defense Strategies:**
- Pause before acting on any urgent request
- Verify through a separate channel (call the company directly)
- Never click links in unexpected emails
- Check the sender's actual email address, not just the display name`
  },
  {
    id: 'kb-6',
    title: 'Incident Response Guide',
    category: 'Response',
    icon: '🚨',
    readTime: '6 min',
    content: `**If You Clicked a Phishing Link:**
1. Disconnect from the internet
2. Run a malware scan immediately
3. Clear browser cache and cookies
4. Check for unauthorized browser extensions

**If You Entered Credentials:**
1. Change the password on the affected account IMMEDIATELY
2. Change passwords on any accounts using the same password
3. Enable 2FA on all accounts
4. Monitor your accounts for suspicious activity
5. Check if your email has been forwarded to unknown addresses

**If Financial Information Was Compromised:**
1. Contact your bank immediately
2. Freeze your credit with all three bureaus (Equifax, Experian, TransUnion)
3. Monitor bank statements daily for 90 days
4. Consider identity theft protection services
5. File a report at identitytheft.gov (US) or equivalent

**Reporting:**
- Report phishing emails: forward to phishing@apwg.org
- Report to the impersonated company
- Report to your IT/security department
- File complaints at ic3.gov (FBI) or reportfraud.ftc.gov`
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// THREAT INTELLIGENCE FEED (Simulated)
// ═══════════════════════════════════════════════════════════════════════════

export const threatFeed = [
  {
    id: 'threat-1',
    timestamp: '2025-03-12T14:23:00Z',
    severity: 'critical',
    title: 'New PayPal Credential Harvesting Campaign',
    description: 'A large-scale campaign using look-alike domains targeting PayPal users with fake invoice notifications.',
    attackType: 'Credential Harvesting',
    industry: 'Financial Services',
    iocs: ['paypal-invoicing.com', 'paypal-billing-secure.com', 'paypal-statement.net'],
    region: 'Global',
    ttps: ['T1566.001 - Spearphishing Attachment', 'T1204 - User Execution']
  },
  {
    id: 'threat-2',
    timestamp: '2025-03-12T11:45:00Z',
    severity: 'high',
    title: 'Microsoft 365 OAuth Consent Phishing Wave',
    description: 'Attackers are using malicious OAuth apps to gain persistent access to Microsoft 365 accounts without stealing passwords.',
    attackType: 'OAuth Abuse',
    industry: 'Technology',
    iocs: ['ms-365-consent.com', 'azure-app-verify.com'],
    region: 'North America',
    ttps: ['T1550.001 - Application Access Token', 'T1098 - Account Manipulation']
  },
  {
    id: 'threat-3',
    timestamp: '2025-03-12T09:12:00Z',
    severity: 'medium',
    title: 'Amazon Delivery Notification Smishing',
    description: 'SMS campaign impersonating Amazon delivery updates with links to credential harvesting pages.',
    attackType: 'Smishing',
    industry: 'E-Commerce',
    iocs: ['amzn-delivery-update.com', 'amazon-package-track.xyz'],
    region: 'United States',
    ttps: ['T1566.002 - Spearphishing Link', 'T1598 - Phishing for Information']
  },
  {
    id: 'threat-4',
    timestamp: '2025-03-11T22:30:00Z',
    severity: 'critical',
    title: 'Healthcare Sector Targeted Ransomware via Phishing',
    description: 'Coordinated campaign targeting healthcare organizations with phishing emails containing ransomware droppers disguised as patient records.',
    attackType: 'Ransomware Delivery',
    industry: 'Healthcare',
    iocs: ['medical-records-portal.com', 'patient-data-secure.net'],
    region: 'Europe',
    ttps: ['T1566.001 - Spearphishing Attachment', 'T1486 - Data Encrypted for Impact']
  },
  {
    id: 'threat-5',
    timestamp: '2025-03-11T18:15:00Z',
    severity: 'high',
    title: 'Fake LinkedIn Job Offer Campaign',
    description: 'Sophisticated campaign using cloned LinkedIn profiles and job offers to steal credentials and personal information.',
    attackType: 'Social Engineering',
    industry: 'Cross-Industry',
    iocs: ['linkedin-careers-portal.com', 'professional-recruiting.xyz'],
    region: 'Global',
    ttps: ['T1598.003 - Spearphishing Service', 'T1589 - Gather Victim Identity']
  },
  {
    id: 'threat-6',
    timestamp: '2025-03-11T15:00:00Z',
    severity: 'medium',
    title: 'Government Tax Refund Phishing (IRS/HMRC)',
    description: 'Seasonal campaign impersonating tax authorities with fake refund notifications.',
    attackType: 'Credential Harvesting',
    industry: 'Government',
    iocs: ['irs-refund-portal.com', 'hmrc-tax-rebate.co.uk.verify.xyz'],
    region: 'US, UK',
    ttps: ['T1566.002 - Spearphishing Link', 'T1204 - User Execution']
  },
  {
    id: 'threat-7',
    timestamp: '2025-03-11T10:22:00Z',
    severity: 'low',
    title: 'Cryptocurrency Airdrop Scam Wave',
    description: 'Multiple fake token airdrop campaigns on social media directing users to wallet-draining smart contracts.',
    attackType: 'Cryptocurrency Scam',
    industry: 'Cryptocurrency',
    iocs: ['free-token-airdrop.io', 'defi-claim-rewards.com'],
    region: 'Global',
    ttps: ['T1566.002 - Spearphishing Link', 'T1657 - Financial Theft']
  },
  {
    id: 'threat-8',
    timestamp: '2025-03-10T20:45:00Z',
    severity: 'high',
    title: 'QR Code Phishing (Quishing) in Corporate Environments',
    description: 'Physical QR codes placed in corporate buildings redirecting to credential harvesting pages.',
    attackType: 'Quishing',
    industry: 'Corporate',
    iocs: ['scan-to-connect-wifi.com', 'corporate-portal-login.xyz'],
    region: 'Global',
    ttps: ['T1566.002 - Spearphishing Link', 'T1598 - Phishing for Information']
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPARISON DATA (Side-by-Side)
// ═══════════════════════════════════════════════════════════════════════════

export const comparisonPairs = [
  {
    id: 'compare-1',
    brand: 'PayPal',
    icon: '💳',
    legitimate: {
      url: 'https://www.paypal.com/signin',
      features: [
        { label: 'Domain', value: 'paypal.com', safe: true },
        { label: 'Protocol', value: 'HTTPS with EV cert', safe: true },
        { label: 'Login Flow', value: 'Email first, then password', safe: true },
        { label: 'CAPTCHA', value: 'reCAPTCHA present', safe: true },
        { label: 'Footer', value: 'Full legal links, accessibility', safe: true },
        { label: 'Form Action', value: 'Posts to paypal.com', safe: true }
      ]
    },
    phishing: {
      url: 'http://paypa1-secure.com/signin',
      features: [
        { label: 'Domain', value: 'paypa1-secure.com (1 vs l)', safe: false },
        { label: 'Protocol', value: 'HTTP — no encryption', safe: false },
        { label: 'Login Flow', value: 'Email & password on same page', safe: false },
        { label: 'CAPTCHA', value: 'None', safe: false },
        { label: 'Footer', value: 'Missing or broken links', safe: false },
        { label: 'Form Action', value: 'Posts to external server', safe: false }
      ]
    },
    differences: [
      'Domain uses "1" instead of "l" (number vs letter)',
      'No HTTPS encryption',
      'Login asks for all credentials at once',
      'Missing security features (CAPTCHA, 2FA prompt)',
      'Footer links are missing or non-functional',
      'Form data is sent to an external server'
    ]
  },
  {
    id: 'compare-2',
    brand: 'Google',
    icon: '🔍',
    legitimate: {
      url: 'https://accounts.google.com/signin',
      features: [
        { label: 'Domain', value: 'accounts.google.com', safe: true },
        { label: 'Protocol', value: 'HTTPS with Google cert', safe: true },
        { label: 'Login Flow', value: 'Step-by-step (email → password)', safe: true },
        { label: 'UI', value: 'Material Design, current branding', safe: true },
        { label: 'Footer', value: 'Help, Privacy, Terms links', safe: true },
        { label: 'Languages', value: 'Language selector at bottom', safe: true }
      ]
    },
    phishing: {
      url: 'https://g00gle-signin.com/login',
      features: [
        { label: 'Domain', value: 'g00gle-signin.com (0s vs os)', safe: false },
        { label: 'Protocol', value: 'HTTPS (free cert)', safe: false },
        { label: 'Login Flow', value: 'Single page email+password', safe: false },
        { label: 'UI', value: 'Slightly outdated design', safe: false },
        { label: 'Footer', value: 'Missing or static links', safe: false },
        { label: 'Languages', value: 'No language selector', safe: false }
      ]
    },
    differences: [
      'Domain uses "00" instead of "oo"',
      'SSL certificate is from a free provider, not Google',
      'Asks for email and password simultaneously',
      'Missing "Create account" option',
      'No language selector',
      'Outdated logo and design elements'
    ]
  },
  {
    id: 'compare-3',
    brand: 'Microsoft',
    icon: '🪟',
    legitimate: {
      url: 'https://login.microsoftonline.com',
      features: [
        { label: 'Domain', value: 'login.microsoftonline.com', safe: true },
        { label: 'Protocol', value: 'HTTPS with Microsoft cert', safe: true },
        { label: 'Branding', value: 'Custom org branding if configured', safe: true },
        { label: 'Login Flow', value: 'Email → org redirect → password', safe: true },
        { label: 'Options', value: 'Sign-in options, forgot password', safe: true },
        { label: 'Footer', value: 'Terms of use, Privacy', safe: true }
      ]
    },
    phishing: {
      url: 'https://microsoft-365-login.com/auth',
      features: [
        { label: 'Domain', value: 'microsoft-365-login.com', safe: false },
        { label: 'Protocol', value: 'HTTPS (Let\'s Encrypt)', safe: false },
        { label: 'Branding', value: 'Generic Microsoft logo', safe: false },
        { label: 'Login Flow', value: 'All fields on one page', safe: false },
        { label: 'Options', value: 'Limited or missing options', safe: false },
        { label: 'Footer', value: 'Minimal or copied text', safe: false }
      ]
    },
    differences: [
      'Not on microsoftonline.com or microsoft.com domain',
      'Certificate is from Let\'s Encrypt, not Microsoft',
      'Missing organization-specific branding',
      'No "Sign-in options" link',
      'Simplified login that skips normal redirects',
      'Footer text may be copied but links don\'t work'
    ]
  },
  {
    id: 'compare-4',
    brand: 'Amazon',
    icon: '📦',
    legitimate: {
      url: 'https://www.amazon.com/ap/signin',
      features: [
        { label: 'Domain', value: 'amazon.com', safe: true },
        { label: 'Protocol', value: 'HTTPS', safe: true },
        { label: 'CAPTCHA', value: 'CAPTCHA on suspicious logins', safe: true },
        { label: 'Footer', value: 'Conditions of Use, Privacy Notice', safe: true },
        { label: 'Options', value: 'Create account, Need help?', safe: true },
        { label: 'Design', value: 'Current Amazon branding', safe: true }
      ]
    },
    phishing: {
      url: 'https://amazon-verify-account.com/signin',
      features: [
        { label: 'Domain', value: 'amazon-verify-account.com', safe: false },
        { label: 'Protocol', value: 'HTTPS', safe: false },
        { label: 'CAPTCHA', value: 'No CAPTCHA', safe: false },
        { label: 'Footer', value: 'Copied but non-functional', safe: false },
        { label: 'Options', value: 'Missing create account', safe: false },
        { label: 'Design', value: 'Close but slightly off colors', safe: false }
      ]
    },
    differences: [
      'Domain is amazon-verify-account.com, not amazon.com',
      'No CAPTCHA challenge',
      '"Create account" link is missing',
      'Footer links don\'t actually navigate anywhere',
      'Color shades are slightly different from real Amazon',
      'May ask for additional info like credit card during login'
    ]
  },
  {
    id: 'compare-5',
    brand: 'Netflix',
    icon: '🎬',
    legitimate: {
      url: 'https://www.netflix.com/login',
      features: [
        { label: 'Domain', value: 'netflix.com', safe: true },
        { label: 'Protocol', value: 'HTTPS with Netflix EV cert', safe: true },
        { label: 'Login Flow', value: 'Email or phone, then password', safe: true },
        { label: 'Footer', value: 'Questions? Call customer service', safe: true },
        { label: 'Remember Me', value: 'Persistent login toggle', safe: true },
        { label: 'Protection', value: 'reCAPTCHA protected note', safe: true }
      ]
    },
    phishing: {
      url: 'http://netflix-billing-update.com/login',
      features: [
        { label: 'Domain', value: 'netflix-billing-update.com', safe: false },
        { label: 'Protocol', value: 'HTTP or basic SSL', safe: false },
        { label: 'Login Flow', value: 'Immediate credit card request', safe: false },
        { label: 'Footer', value: 'Copied boilerplate, broken links', safe: false },
        { label: 'Urgency', value: '"Account suspended in 24h" banner', safe: false },
        { label: 'Protection', value: 'Fake badge images', safe: false }
      ]
    },
    differences: [
      'Domain is netflix-billing-update.com instead of netflix.com',
      'Asks directly for credit card CVV and billing details after login',
      'High urgency psychological pressure ("Suspended in 24 hours")',
      'Non-functional footer links and fake security seal images',
      'Lacks official Netflix EV certificate verification'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// ACHIEVEMENTS / BADGES
// ═══════════════════════════════════════════════════════════════════════════

export const achievements = [
  { id: 'ach-1', name: 'First Scan', icon: '🔍', description: 'Scan your first URL', requirement: 'Complete 1 URL scan' },
  { id: 'ach-2', name: 'Scanner Pro', icon: '🛡️', description: 'Scan 10 URLs', requirement: 'Complete 10 URL scans' },
  { id: 'ach-3', name: 'Email Detective', icon: '📧', description: 'Complete 5 email triage challenges', requirement: 'Score 5 email challenges' },
  { id: 'ach-4', name: 'URL Master', icon: '🔗', description: 'Get all URL challenges correct', requirement: '100% on URL challenges' },
  { id: 'ach-5', name: 'Sharp Eye', icon: '👁️', description: 'Find all indicators in an inspector challenge', requirement: '100% on any inspector challenge' },
  { id: 'ach-6', name: 'Speed Demon', icon: '⚡', description: 'Complete a challenge under 30 seconds', requirement: 'Finish challenge < 30s' },
  { id: 'ach-7', name: 'Knowledge Seeker', icon: '📚', description: 'Read all knowledge base articles', requirement: 'View all KB articles' },
  { id: 'ach-8', name: 'Perfect Score', icon: '💯', description: 'Score 100% on any training module', requirement: '100% in any module' },
  { id: 'ach-9', name: 'Streak Master', icon: '🔥', description: 'Get a 5-answer streak', requirement: '5 correct answers in a row' },
  { id: 'ach-10', name: 'PhishGuard Certified', icon: '🏆', description: 'Complete all training modules', requirement: 'Finish all modules' },
];
