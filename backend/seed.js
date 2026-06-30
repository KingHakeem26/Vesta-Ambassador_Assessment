import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const questions = [
  // SECTION 1: KYC (Q1-Q6, MC)
  {
    order_num: 1, type: 'mc', section: 'KYC',
    text: 'A new user wants to immediately purchase an NFT on the Vesta Launchpad after registering, but has not yet completed KYC. What will happen?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'They can buy NFTs but with a reduced transaction limit' },
      { id: 'b', text: 'They can buy NFTs, but their purchase will not generate commissions for any Ambassador' },
      { id: 'c', text: 'They cannot invest on Vesta until KYC has been successfully verified' },
      { id: 'd', text: 'They will be placed on a 72-hour waitlist before gaining access' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 2, type: 'mc', section: 'KYC',
    text: 'During KYC on Vesta, a user is asked to select their identity document type. Which of the following are accepted?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'Passport' },
      { id: 'b', text: 'ID Card' },
      { id: 'c', text: "Driver's License" },
      { id: 'd', text: 'Utility Bill' },
      { id: 'e', text: 'Residence Permit' }
    ],
    correct_answers: ['a', 'b', 'c', 'e'], model_answer: null
  },
  {
    order_num: 3, type: 'mc', section: 'KYC',
    text: 'Which of the following documents are accepted as Source of Funds during Vesta KYC?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'Bank statements showing available fiat and payments received' },
      { id: 'b', text: 'Sales invoices' },
      { id: 'c', text: 'Trading statements from a crypto exchange' },
      { id: 'd', text: 'Digital wallet history showing profit' },
      { id: 'e', text: 'A government-issued tax identification card' }
    ],
    correct_answers: ['a', 'b', 'c', 'd'], model_answer: null
  },
  {
    order_num: 4, type: 'mc', section: 'KYC',
    text: "An Ambassador's referral goes through KYC but is rejected by the verification system. What is the direct impact on the Ambassador's commissions from that person?",
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Commissions are placed in Pending status until the user retries KYC successfully' },
      { id: 'b', text: 'The Ambassador receives commissions at a reduced rate until KYC is resolved' },
      { id: 'c', text: 'No commission is generated at all – a rejected KYC user does not meet the qualifying conditions' },
      { id: 'd', text: 'The commission is redirected to the Ambassador one level above' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 5, type: 'mc', section: 'KYC',
    text: 'Which of the following statements about KYC on Vesta is CORRECT?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'KYC only needs to be completed once and can never expire' },
      { id: 'b', text: 'If KYC is rejected, the user can still participate with a temporary limited account' },
      { id: 'c', text: "KYC verification on Vesta is powered by a third-party provider, meaning verification speed is determined by that provider's system" },
      { id: 'd', text: 'Ambassadors are exempt from KYC – it is only required for regular investors' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 6, type: 'mc', section: 'KYC',
    text: 'KYC on Vesta involves two distinct categories of documents. Which pairing correctly matches each document to its category?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Passport = Source of Funds | Bank Statement = Identity' },
      { id: 'b', text: 'Passport = Identity | Bank Statement = Source of Funds' },
      { id: 'c', text: "Driver's License = Source of Funds | Trading Statement = Identity" },
      { id: 'd', text: 'Utility Bill = Identity | Sales Invoice = Source of Funds' }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 2: Registration (Q7-Q10, MC)
  {
    order_num: 7, type: 'mc', section: 'Registration',
    text: 'What is the correct URL to access and register on the Vesta platform?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'vesta.io' },
      { id: 'b', text: 'vesta-platform.com' },
      { id: 'c', text: 'vestagroup.io' },
      { id: 'd', text: 'app.vestagroup.com' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 8, type: 'mc', section: 'Registration',
    text: 'A new user has just registered on Vesta and wants to start investing. Which of the following steps must be completed before they can purchase an NFT on the Launchpad?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'Complete KYC verification' },
      { id: 'b', text: 'Fill in all required profile fields' },
      { id: 'c', text: 'Accept the Community Bonus Policy and Terms & Conditions' },
      { id: 'd', text: 'Set up 2FA (Two-Factor Authentication)' },
      { id: 'e', text: 'Purchase a minimum of 5 USDC worth of crypto first' }
    ],
    correct_answers: ['a', 'b'], model_answer: null
  },
  {
    order_num: 9, type: 'mc', section: 'Registration',
    text: 'In what order should a brand new user complete the following steps to become an active investor on Vesta?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Buy NFT → Register → Complete KYC → Fill in Profile' },
      { id: 'b', text: 'Fill in Profile → Register → Complete KYC → Buy NFT' },
      { id: 'c', text: 'Register → Fill in Profile → Complete KYC → Buy NFT' },
      { id: 'd', text: 'Complete KYC → Register → Fill in Profile → Buy NFT' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 10, type: 'mc', section: 'Registration',
    text: 'A user successfully registered on Vesta, completed their profile, but skipped KYC because they found it time-consuming. They then tried to purchase an NFT. What will happen?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'The purchase will go through, but will be flagged for review' },
      { id: 'b', text: 'The system will block the purchase and prompt the user to complete KYC first' },
      { id: 'c', text: 'The purchase will succeed, but the NFT will be held in escrow until KYC is done' },
      { id: 'd', text: 'The user will be redirected to a limited marketplace with lower-value NFTs' }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 3: Profile (Q11-Q14, MC)
  {
    order_num: 11, type: 'mc', section: 'Profile',
    text: 'Which of the following are required fields when setting up a Vesta profile?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'First Name' },
      { id: 'b', text: 'Last Name' },
      { id: 'c', text: 'Annual Income' },
      { id: 'd', text: 'Phone Number' },
      { id: 'e', text: 'Postal Code' }
    ],
    correct_answers: ['a', 'b', 'd', 'e'], model_answer: null
  },
  {
    order_num: 12, type: 'mc', section: 'Profile',
    text: 'A user has filled in their First Name, Last Name, Email, Phone Number, Address, Country, and City – but skipped Birth Date and Postal Code. Can they proceed?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Yes – Birth Date and Postal Code are optional fields' },
      { id: 'b', text: 'Yes – only First Name, Last Name, and Email are strictly required' },
      { id: 'c', text: 'No – both Birth Date and Postal Code are required fields that must be completed' },
      { id: 'd', text: 'No – but only Postal Code is required; Birth Date can be skipped' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 13, type: 'mc', section: 'Profile',
    text: 'Which of the following combinations ONLY contains fields that are part of the Vesta user profile?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Risk Appetite, Investment Goal, Annual Income' },
      { id: 'b', text: 'About Me, Joined Date, Birth Date' },
      { id: 'c', text: 'Portfolio Value, Preferred Asset Class, Net Worth' },
      { id: 'd', text: 'Tax Identification Number, Country of Residence, Investment Horizon' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 14, type: 'mc', section: 'Profile',
    text: 'After a user registers and fills in their profile on Vesta, where can they navigate to apply for the Ambassador Program?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Launchpad → Browse → Apply for Ambassador' },
      { id: 'b', text: 'Stats → Leaderboard → Become an Ambassador' },
      { id: 'c', text: 'Click profile picture (top-right) → Profile → Community Bonus tab → Apply Now' },
      { id: 'd', text: 'Marketplace → Community → Ambassador Registration' }
    ],
    correct_answers: ['c'], model_answer: null
  },

  // SECTION 4: 2FA (Q15-Q18, MC)
  {
    order_num: 15, type: 'mc', section: '2FA',
    text: 'A user wants to enable 2FA on their Vesta account. What is the correct navigation path?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Profile → About Me → Security Settings → Enable 2FA' },
      { id: 'b', text: 'Account (top-right navbar) → Settings → Security & Privacy tab → Authenticator sub-tab → Verify Now' },
      { id: 'c', text: 'Launchpad → Account → Privacy → 2FA Setup' },
      { id: 'd', text: 'Community Bonus tab → Settings → Authenticator' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 16, type: 'mc', section: '2FA',
    text: 'Which authenticator app does Vesta use for 2FA, and what must the user do immediately after scanning the QR code during setup?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Microsoft Authenticator – then set a PIN' },
      { id: 'b', text: 'Authy – then confirm via email link' },
      { id: 'c', text: 'Google Authenticator – then enter the OTP shown in the app into the Vesta platform' },
      { id: 'd', text: 'LastPass Authenticator – then approve a push notification' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 17, type: 'mc', section: '2FA',
    text: 'Why is 2FA particularly important for an Ambassador account compared to a regular user account?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Because 2FA is required to unlock Level 4 and above commissions' },
      { id: 'b', text: 'Because Ambassador accounts hold accumulated USDC commissions and a linked withdrawal wallet address, making them a higher-value target for unauthorised access' },
      { id: 'c', text: 'Because MiCA regulations mandate 2FA specifically for Ambassador-level accounts' },
      { id: 'd', text: "Because without 2FA, the Ambassador's invite link will be deactivated after 30 days" }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 18, type: 'mc', section: '2FA',
    text: 'A user loses access to their Google Authenticator app after enabling 2FA on Vesta. What is the correct course of action?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'They can disable 2FA directly from the login screen using email verification' },
      { id: 'b', text: '2FA automatically deactivates after 14 days of failed login attempts' },
      { id: 'c', text: 'They need to contact the Vesta support team for account recovery assistance' },
      { id: 'd', text: 'They can use their KYC documents as an alternative login method' }
    ],
    correct_answers: ['c'], model_answer: null
  },

  // SECTION 5: Ambassador (Q19-Q24, MC)
  {
    order_num: 19, type: 'mc', section: 'Ambassador',
    text: 'A user is KYC verified and has purchased one NFT on the Vesta Launchpad, but has not yet accepted the Community Bonus Terms & Conditions. Can they apply for the Ambassador Program?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Yes – two out of three requirements are enough to start the application' },
      { id: 'b', text: 'Yes – the T&C can be accepted after the application is submitted' },
      { id: 'c', text: 'No – all three eligibility requirements must be fully met before the application can be approved' },
      { id: 'd', text: "It depends on the Vesta team's discretion at the time of review" }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 20, type: 'mc', section: 'Ambassador',
    text: 'An Ambassador has not purchased any NFT for the past 35 days. What is the consequence?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Their Ambassador status is permanently revoked and they must reapply from scratch' },
      { id: 'b', text: 'All their pending and available bonuses are forfeited' },
      { id: 'c', text: 'Their account is locked and they stop earning tiered commissions until a new NFT is purchased' },
      { id: 'd', text: 'They are automatically downgraded to a regular user account' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 21, type: 'mc', section: 'Ambassador',
    text: 'Which of the following statements about the Ambassador Program is FALSE?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Ambassadors must complete KYC to be eligible' },
      { id: 'b', text: 'Ambassadors gain access to the Ambassador Dashboard once their application is approved' },
      { id: 'c', text: 'Ambassadors are required to pay a monthly membership fee to maintain their status' },
      { id: 'd', text: 'Ambassadors must purchase at least one NFT per month to remain eligible for commissions' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 22, type: 'mc', section: 'Ambassador',
    text: 'What does "qualifying direct user" mean in the context of unlocking Ambassador commission levels?',
    allow_multiple: false,
    options: [
      { id: 'a', text: "Any user who has registered on Vesta using the Ambassador's referral link" },
      { id: 'b', text: 'A user who is KYC verified, has accepted the Community Bonus T&C, and has purchased at least one NFT on the Launchpad' },
      { id: 'c', text: 'A user who has made at least three NFT purchases on the Launchpad' },
      { id: 'd', text: 'A user who has also applied to become an Ambassador themselves' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 23, type: 'mc', section: 'Ambassador',
    text: 'An Ambassador currently has 9 qualified direct users. Which commission levels are they able to access?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Level 1 only' },
      { id: 'b', text: 'Levels 1 and 2 only' },
      { id: 'c', text: 'Levels 1, 2, and 3' },
      { id: 'd', text: 'Levels 1 through 4' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 24, type: 'mc', section: 'Ambassador',
    text: 'An Ambassador had 7 qualified direct users last month (unlocking L1, L2, L3). This month, 3 of those users became inactive. Their count drops to 4. What happens to their commission earnings this month?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Nothing changes – level unlocks are permanent once achieved' },
      { id: 'b', text: 'L3 earnings pause this month since the count has dropped below the ≥5 threshold for that level' },
      { id: 'c', text: 'All commission levels are reset and must be re-unlocked from Level 1' },
      { id: 'd', text: "Their Ambassador account is flagged for review" }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 6: NFT (Q25-Q29, MC)
  {
    order_num: 25, type: 'mc', section: 'NFT',
    text: 'Vesta operates on which blockchain, and which wallets are compatible for purchasing NFTs on the Launchpad?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'Vesta runs on Ethereum – MetaMask is compatible' },
      { id: 'b', text: 'Vesta runs on Solana – only Phantom is compatible' },
      { id: 'c', text: 'Vesta runs on Ethereum – Trust Wallet is compatible' },
      { id: 'd', text: 'Vesta runs on Ethereum – WalletConnect is compatible' },
      { id: 'e', text: 'Vesta runs on Binance Smart Chain – MetaMask requires manual network configuration' }
    ],
    correct_answers: ['a', 'c', 'd'], model_answer: null
  },
  {
    order_num: 26, type: 'mc', section: 'NFT',
    text: 'A user in your network asks: "Can I pay for an NFT with a credit card or do I need crypto?" What is the correct answer?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Only USDC is accepted – the user must first acquire USDC' },
      { id: 'b', text: 'Both USDC (crypto) and card payment are accepted on the Vesta platform' },
      { id: 'c', text: 'Card payment is available, but attracts an additional 5% surcharge' },
      { id: 'd', text: 'Only bank transfers and crypto are accepted – no card payments' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 27, type: 'mc', section: 'NFT',
    text: 'A user purchases a 400 USDC NFT through your referral link. Two days later they want a refund. What is the correct response?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Refunds are available within 48 hours – direct them to Vesta support' },
      { id: 'b', text: 'Refunds are available only if the NFT has not yet been minted' },
      { id: 'c', text: 'There are no refunds on the Vesta platform – all NFT purchases are final and non-refundable' },
      { id: 'd', text: 'They can sell the NFT back to Vesta at the original purchase price' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 28, type: 'mc', section: 'NFT',
    text: 'What is the correct sequence to purchase an NFT on the Vesta Launchpad?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Marketplace → Select NFT → Confirm identity → Pay' },
      { id: 'b', text: 'Launchpad → Browse Launchpad → Select NFT → Set quantity → Confirm via wallet' },
      { id: 'c', text: 'Profile → My NFTs → Purchase → Set quantity → Confirm' },
      { id: 'd', text: 'Stats → NFT Store → Add to cart → Checkout' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 29, type: 'mc', section: 'NFT',
    text: 'Commission is calculated as a percentage of what exactly?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'The current market price of the NFT at the time of commission calculation' },
      { id: 'b', text: 'The purchase price of the NFT at the time of the transaction on the Launchpad' },
      { id: 'c', text: 'A flat rate per NFT regardless of its price' },
      { id: 'd', text: 'The total portfolio value of the buyer in Vesta' }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 7: Commission (Q30-Q38, MC)
  {
    order_num: 30, type: 'mc', section: 'Commission',
    text: 'What is the total Community Bonus allocation from every NFT sale, and how is it broken down?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '20% total: 15% tiered commissions + 3% Leader Pool + 2% VIP Pool' },
      { id: 'b', text: '17% total: allocated entirely across Levels 1–8' },
      { id: 'c', text: '20% total: 17% tiered commissions (L1–L8) + 2% Leader Pool + 1% VIP Pool' },
      { id: 'd', text: '20% total: 10% tiered commissions + 5% Leader Pool + 5% VIP Pool' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 31, type: 'mc', section: 'Commission',
    text: 'The commission rate for Level 1 is 7%, and for Level 2 is 4%. A 500 USDC NFT is purchased by someone at Level 2 in your network. How much do you earn?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '35 USDC (7% of 500)' },
      { id: 'b', text: '20 USDC (4% of 500)' },
      { id: 'c', text: '15 USDC (3% of 500)' },
      { id: 'd', text: '5 USDC (1% of 500)' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 32, type: 'mc', section: 'Commission',
    text: 'An Ambassador has a full 8-level network. What is the correct total tiered commission rate if a purchase is made anywhere in their network (assuming all levels are unlocked)?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '15%' },
      { id: 'b', text: '17%' },
      { id: 'c', text: '19%' },
      { id: 'd', text: '20%' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 33, type: 'mc', section: 'Commission',
    text: 'A user at Level 5 in your network purchases an NFT. You currently have 12 qualified direct users. Do you earn a commission from this purchase?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Yes – the user is in your network, so all levels apply' },
      { id: 'b', text: 'Yes – but only at 50% of the Level 5 rate as a partial unlock' },
      { id: 'c', text: 'No – Level 5 requires a minimum of 14 qualified direct users, and you only have 12' },
      { id: 'd', text: 'No – Level 5 commissions only apply if the Level 5 user is also KYC verified within 30 days' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 34, type: 'mc', section: 'Commission',
    text: 'Why does the Vesta commission structure require progressively more direct users to unlock deeper levels?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'To reward Ambassadors who have been active on the platform for longer' },
      { id: 'b', text: 'To prevent Ambassadors with small networks from passively earning from deep networks they did not meaningfully contribute to building' },
      { id: 'c', text: 'Because MiCA regulations cap commission levels for small networks' },
      { id: 'd', text: 'To reduce the total commission payout burden on Vesta' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 35, type: 'mc', section: 'Commission',
    text: "Ambassador A invited B (L1). B invited C (L2). C invited D (L3). D purchases a 300 USDC NFT. Assuming all thresholds are met and all parties are qualified, who receives a commission?",
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Only A receives a commission (L3 rate = 3%) = 9 USDC' },
      { id: 'b', text: "A receives L3 (3%), B receives L2 (4%), C receives L1 (7%) – all from D's single purchase" },
      { id: 'c', text: 'Only C receives a commission because they directly referred D' },
      { id: 'd', text: 'A, B, C, and D all receive equal shares of the 17% total' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 36, type: 'mc', section: 'Commission',
    text: "A user at Level 4 in your network purchases an NFT, but has not yet accepted the Community Bonus Terms & Conditions. What happens to your commission?",
    allow_multiple: false,
    options: [
      { id: 'a', text: 'You receive the full Level 4 commission (1%)' },
      { id: 'b', text: 'The commission is placed in Pending until the user accepts the T&C' },
      { id: 'c', text: 'No commission is generated – the buyer does not meet the qualifying conditions' },
      { id: 'd', text: 'The commission is split between you and the Ambassador above you in the chain' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 37, type: 'mc', section: 'Commission',
    text: 'What is the commission rate for Levels 5, 6, 7, and 8 respectively?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '1%, 0.75%, 0.5%, 0.25%' },
      { id: 'b', text: '0.5% for each of the four levels' },
      { id: 'c', text: '1% for L5, 0.5% for L6, L7, and L8' },
      { id: 'd', text: '2% for L5, declining to 0.5% by L8' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 38, type: 'mc', section: 'Commission',
    text: "An Ambassador's 5 qualified direct users all stop purchasing NFTs in the same month, dropping the active count to zero. What is the full impact?",
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Only Level 3 and above are affected – L1 and L2 remain open' },
      { id: 'b', text: 'All commission levels are paused since no level threshold (including L1 which requires ≥1) can be met' },
      { id: 'c', text: 'Commission levels are unaffected – thresholds only apply at initial unlock' },
      { id: 'd', text: "The Ambassador's account is immediately and permanently closed" }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 8: Pools (Q39-Q44, MC)
  {
    order_num: 39, type: 'mc', section: 'Pools',
    text: 'The Leader Pool this month totals 4,000 USDC. There are 10 qualifying Ambassadors. The top-ranked Ambassador (#1) expects a larger share. How much do they actually receive?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '800 USDC – #1 gets 20% of the pool' },
      { id: 'b', text: '1,000 USDC – #1 gets 25% as top performer' },
      { id: 'c', text: '400 USDC – equal share with all 9 other qualifying Ambassadors' },
      { id: 'd', text: '600 USDC – proportional to their bonus volume share' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 40, type: 'mc', section: 'Pools',
    text: 'What metric determines which Ambassadors qualify for the Leader Pool each month?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Total number of new referrals recruited that month' },
      { id: 'b', text: 'Total USDC claimed from commissions that month' },
      { id: 'c', text: 'Total personal bonus volume generated from their network that month' },
      { id: 'd', text: 'The number of NFTs purchased by the Ambassador themselves that month' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 41, type: 'mc', section: 'Pools',
    text: "An Ambassador ranked #3 in January's Leader Pool. In February, they ranked #11. What happens to their Leader Pool earnings in February?",
    allow_multiple: false,
    options: [
      { id: 'a', text: 'They receive a reduced share as an "honorable mention" for being just outside the top 10' },
      { id: 'b', text: 'They carry over their January status and still receive a partial share' },
      { id: 'c', text: 'They receive nothing from the Leader Pool – the leaderboard resets every month and only the top 10 qualify' },
      { id: 'd', text: "They are guaranteed a spot in the next month's pool as compensation" }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 42, type: 'mc', section: 'Pools',
    text: 'What is the requirement to qualify for the VIP Pool?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Be ranked in the top 10 Ambassadors by personal bonus volume' },
      { id: 'b', text: 'Have recruited at least 20 direct users total' },
      { id: 'c', text: 'Have at least 5 active referrals at Level 8 of your network' },
      { id: 'd', text: 'Have been an active Ambassador for more than 6 consecutive months' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 43, type: 'mc', section: 'Pools',
    text: 'An Ambassador qualified for the VIP Pool in March with exactly 5 active Level 8 referrals. In April, 2 of those referrals have not purchased an NFT in over 90 days. What happens in April?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'They still qualify – once VIP status is earned it applies for 3 months' },
      { id: 'b', text: 'They do not qualify for the VIP Pool in April, as only 3 of their L8 referrals are now active (below the ≥5 minimum)' },
      { id: 'c', text: 'They receive a reduced VIP share proportional to their active L8 count' },
      { id: 'd', text: 'They have a 30-day grace period to reactivate the inactive referrals' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 44, type: 'mc', section: 'Pools',
    text: 'What is the key structural difference between how an Ambassador qualifies for the Leader Pool versus the VIP Pool?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Leader Pool is annual; VIP Pool is monthly' },
      { id: 'b', text: 'Leader Pool qualification is based on network width and volume; VIP Pool is based on network depth and activity at Level 8' },
      { id: 'c', text: 'Leader Pool requires a minimum tenure as an Ambassador; VIP Pool does not' },
      { id: 'd', text: 'Leader Pool is shared proportionally by volume; VIP Pool is shared equally' }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 9: Claims (Q45-Q50, MC)
  {
    order_num: 45, type: 'mc', section: 'Claims',
    text: 'An Ambassador has 0.03 USDC in their Available Bonus balance and attempts to claim it. What will happen?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'The claim will succeed, with the $2.00 platform fee deducted from their next claim' },
      { id: 'b', text: 'The claim will fail – the minimum claimable amount is 0.05 USD' },
      { id: 'c', text: 'The claim will succeed with a penalty fee for claiming below the threshold' },
      { id: 'd', text: 'The system will automatically accumulate the balance until it reaches the minimum' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 46, type: 'mc', section: 'Claims',
    text: 'What fees apply when an Ambassador claims their bonus on Vesta?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'A flat $2.00 platform fee per claim' },
      { id: 'b', text: 'A 1% withdrawal fee on the amount claimed' },
      { id: 'c', text: 'A 0.5% network processing fee' },
      { id: 'd', text: 'A gas fee charged by the Vesta platform' },
      { id: 'e', text: 'No fees – claiming is free' }
    ],
    correct_answers: ['a', 'b'], model_answer: null
  },
  {
    order_num: 47, type: 'mc', section: 'Claims',
    text: 'In what currency are all Ambassador commissions paid out, and to what type of wallet?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'ETH, to any registered wallet' },
      { id: 'b', text: "USDC, directly to the Ambassador's ERC-20 wallet address" },
      { id: 'c', text: 'USDC, held in a Vesta internal wallet until manually withdrawn' },
      { id: 'd', text: 'USDT, to any ERC-20 compatible wallet' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 48, type: 'mc', section: 'Claims',
    text: 'What is the difference between a "Pending" bonus and an "Available" bonus on the Ambassador Dashboard?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Pending means the bonus has not yet been calculated; Available means it has been calculated' },
      { id: 'b', text: 'Pending means the bonus is recorded and visible but not yet claimable; Available means it can be claimed at any time' },
      { id: 'c', text: 'Pending means the Vesta team is reviewing the bonus; Available means it has been approved' },
      { id: 'd', text: 'There is no practical difference – both statuses allow claiming' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 49, type: 'mc', section: 'Claims',
    text: 'An Ambassador submits a claim for 80 USDC but accidentally enters an incorrect wallet address. The transaction is processed. What can they do?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Contact Vesta support within 24 hours to reverse the transaction' },
      { id: 'b', text: 'Nothing – Vesta explicitly states it does not take responsibility for funds sent to incorrect wallet addresses, and blockchain transactions cannot be reversed' },
      { id: 'c', text: 'The transaction will auto-reverse after 7 days if the wallet address is invalid' },
      { id: 'd', text: 'Vesta will reissue the funds after an investigation period of 14 business days' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 50, type: 'mc', section: 'Claims',
    text: 'Which of the following correctly describes when a commission bonus transitions from Pending to Available?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'After the Ambassador manually approves the transaction in their dashboard' },
      { id: 'b', text: 'After 24 hours regardless of the NFT sale status' },
      { id: 'c', text: 'Once the NFT sale concludes and any holding period set by the Vesta admin has passed' },
      { id: 'd', text: 'After the referred user completes their second NFT purchase' }
    ],
    correct_answers: ['c'], model_answer: null
  },

  // SECTION 10: Regulation (Q51-Q54, MC)
  {
    order_num: 51, type: 'mc', section: 'Regulation',
    text: 'What is MiCA, and what is its relevance to Vesta?',
    allow_multiple: false,
    options: [
      { id: 'a', text: "A US SEC regulation for crypto exchanges – Vesta complies to access US markets" },
      { id: 'b', text: "An EU regulatory framework for crypto-asset service providers – Vesta's compliance ensures it operates legally within EU jurisdictions and provides investor protections" },
      { id: 'c', text: 'A voluntary global blockchain standard – Vesta adopts it as a best practice' },
      { id: 'd', text: 'A bilateral financial treaty between the UK and EU – relevant only for UK-based Ambassadors' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 52, type: 'mc', section: 'Regulation',
    text: 'MiFID 2 focuses on transparency and investor protection in financial markets. Why is this directly relevant to the way Ambassadors promote Vesta NFTs?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'MiFID 2 sets the technical standards for how NFTs are minted on Ethereum' },
      { id: 'b', text: 'MiFID 2 determines the commission rate structure for financial referral programs' },
      { id: 'c', text: 'Ambassadors must represent Vesta investments honestly and not make misleading claims – MiFID 2 principles of transparency and fair treatment apply to how investments are promoted' },
      { id: 'd', text: 'MiFID 2 exempts Ambassadors from tax obligations on commission income' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 53, type: 'mc', section: 'Regulation',
    text: 'A prospective investor asks an Ambassador: "Is the return on this NFT guaranteed?" Which response is most aligned with MiCA/MiFID 2 principles?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '"Yes, Vesta is regulatory compliant so all returns are protected"' },
      { id: 'b', text: '"Returns are projected based on the performance of the real-world asset underlying the NFT – they are not guaranteed"' },
      { id: 'c', text: '"I cannot discuss returns – you will need to speak directly with Vesta"' },
      { id: 'd', text: '"Based on historical data, you should expect at least 15% annually"' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 54, type: 'mc', section: 'Regulation',
    text: 'One reason Vesta requires all Ambassadors to understand MiCA and MiFID 2 is to ensure:',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Ambassadors can conduct their own regulatory audits of NFT collections' },
      { id: 'b', text: "Ambassadors are aware of the legal boundaries of investment promotion, so their outreach does not constitute unlawful financial advice or misleading marketing" },
      { id: 'c', text: 'Ambassadors can advise users on tax optimisation strategies within their jurisdiction' },
      { id: 'd', text: 'Ambassadors can independently verify that new NFT collections are compliant before they appear on the Launchpad' }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // SECTION 11: Financials (Q55-Q56, MC)
  {
    order_num: 55, type: 'mc', section: 'Financials',
    text: 'A prospective investor asks: "What is the ROI on this NFT?" As an Ambassador, what is the most accurate and responsible way to frame your answer?',
    allow_multiple: false,
    options: [
      { id: 'a', text: '"ROI is guaranteed – Vesta\'s compliance ensures you will always make a return"' },
      { id: 'b', text: '"ROI stands for Return on Investment. For Vesta NFTs, it reflects the projected return based on the performance of the underlying real-world asset – it is a projection, not a fixed promise"' },
      { id: 'c', text: '"ROI is not relevant for NFTs – focus on the resale value instead"' },
      { id: 'd', text: '"Based on similar assets, you can expect an ROI of 12–18% annually"' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 56, type: 'mc', section: 'Financials',
    text: 'When discussing projected ROI, ARR, or APR with a potential investor, which of the following behaviours would be a violation of Vesta Ambassador standards AND MiFID 2 principles?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Explaining that the returns are projections based on real-world asset performance' },
      { id: 'b', text: 'Stating that past performance of similar assets suggests a certain range of outcomes' },
      { id: 'c', text: 'Promising a specific annual return figure as if it were guaranteed' },
      { id: 'd', text: 'Acknowledging that the investment carries risk alongside potential returns' }
    ],
    correct_answers: ['c'], model_answer: null
  },

  // SECTION 12: Core NFT (Q57-Q63, MC)
  {
    order_num: 57, type: 'mc', section: 'Core NFT',
    text: 'What fundamentally distinguishes a Vesta Core NFT from a standard digital collectible NFT?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Core NFTs have superior artwork created by professional designers' },
      { id: 'b', text: 'Core NFTs represent tokenized fractional ownership in a real-world asset, giving holders exposure to investment returns from that asset' },
      { id: 'c', text: 'Core NFTs can be exchanged for shares in publicly listed companies' },
      { id: 'd', text: 'Core NFTs are exclusively available to users who have been Ambassadors for over 6 months' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 58, type: 'mc', section: 'Core NFT',
    text: 'Before recommending a Core NFT to a prospective investor, an Ambassador should understand which of the following?',
    allow_multiple: true,
    options: [
      { id: 'a', text: 'The real-world asset underlying the NFT' },
      { id: 'b', text: 'The revenue sharing or return distribution structure' },
      { id: 'c', text: 'The risks associated with the underlying asset' },
      { id: 'd', text: 'The regulatory compliance status of the NFT collection' },
      { id: 'e', text: "The NFT's trading volume on secondary markets" }
    ],
    correct_answers: ['a', 'b', 'c', 'd'], model_answer: null
  },
  {
    order_num: 59, type: 'mc', section: 'Core NFT',
    text: 'Understanding a Vesta Founder NFT is most analogous to which of the following actions an investor might take?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Checking the graphics quality of an NFT before purchasing it' },
      { id: 'b', text: 'Reviewing the trading history and price chart of an NFT collection' },
      { id: 'c', text: "Researching the founders, background, and credibility of a company's leadership before investing in their stock" },
      { id: 'd', text: 'Checking whether an NFT is listed on multiple marketplaces' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 60, type: 'mc', section: 'Core NFT',
    text: "A user tells their Ambassador: \"I don't need to know who the founders are – if the NFT is on Vesta, it's been checked already.\" How should the Ambassador respond?",
    allow_multiple: false,
    options: [
      { id: 'a', text: '"Correct – Vesta\'s listing process guarantees the founders are credible"' },
      { id: 'b', text: '"Vesta does not review NFT projects at all – you are entirely on your own"' },
      { id: 'c', text: '"Vesta performs its own due diligence, but as an investor you should also understand who is behind the project – platform listing does not remove your responsibility to make an informed decision"' },
      { id: 'd', text: '"That\'s a good point – just focus on the projected returns instead"' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 61, type: 'mc', section: 'Core NFT',
    text: 'Which of the following scenarios represents an Ambassador acting irresponsibly when promoting a Core NFT?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Explaining the underlying asset and how revenue is distributed before recommending it' },
      { id: 'b', text: 'Telling a prospective investor the NFT carries no risk because it is on a regulated platform' },
      { id: 'c', text: 'Sharing that the projected returns are estimates based on the performance of the underlying real-world asset' },
      { id: 'd', text: 'Acknowledging they are uncertain about one aspect of the NFT and suggesting the investor review the official documentation' }
    ],
    correct_answers: ['b'], model_answer: null
  },
  {
    order_num: 62, type: 'mc', section: 'Core NFT',
    text: 'What is the clearest way to summarise the difference between what an Ambassador must understand about Core NFTs versus Founder NFTs?',
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Core NFTs are for experienced investors; Founder NFTs are for beginners' },
      { id: 'b', text: 'Core NFTs require legal knowledge; Founder NFTs require financial knowledge' },
      { id: 'c', text: 'Core NFTs = understanding WHAT is being invested in (asset, return structure, risks, compliance); Founder NFTs = understanding WHO is behind the investment (founders, credibility, track record)' },
      { id: 'd', text: 'Core NFTs and Founder NFTs require identical due diligence processes' }
    ],
    correct_answers: ['c'], model_answer: null
  },
  {
    order_num: 63, type: 'mc', section: 'Core NFT',
    text: "Inviting People: A user registered on Vesta but did not use any Ambassador's referral link. Can an Ambassador \"claim\" this user as part of their network later?",
    allow_multiple: false,
    options: [
      { id: 'a', text: 'Yes, as long as the user has not yet purchased an NFT' },
      { id: 'b', text: 'No – the referral relationship is only formed when a user registers through a specific Ambassador referral link' },
      { id: 'c', text: 'Yes, by contacting the Vesta team with proof of the connection' },
      { id: 'd', text: 'It depends on whether the user agrees to the referral relationship' }
    ],
    correct_answers: ['b'], model_answer: null
  },

  // TYPE-IN QUESTIONS (TQ1-TQ10, order_nums 64-73)
  {
    order_num: 64, type: 'typein', section: 'KYC',
    text: 'A new user in your network is confused about what documents they need for KYC. Name the TWO categories of documents required during Vesta KYC, and give one example of each.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: "Category 1 – Identity document: e.g. Passport, ID Card, Driver's License, or Residence Permit. Category 2 – Source of Funds: e.g. Bank statement, Sales invoice, Trading statement, or Digital wallet history showing profit."
  },
  {
    order_num: 65, type: 'typein', section: 'Registration',
    text: 'Walk through the correct step-by-step process a brand new user should follow to go from first discovering Vesta to successfully purchasing their first NFT. List the steps in order.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: '1. Visit vestagroup.io and create an account (register). 2. Fill in all required profile fields. 3. Complete KYC verification via Sumsub. 4. Navigate to Launchpad → Browse Launchpad → select NFT → set quantity → confirm via connected Ethereum-compatible wallet.'
  },
  {
    order_num: 66, type: 'typein', section: '2FA',
    text: 'Explain in your own words what 2FA is, which app Vesta uses for it, and why it is especially important for an Ambassador account specifically.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: '2FA (Two-Factor Authentication) is a security method requiring two separate forms of verification to log in. Vesta uses Google Authenticator. It is especially important for Ambassadors because their accounts hold accumulated USDC commission balances and a linked ERC-20 withdrawal wallet address, making them higher-value targets for unauthorised access.'
  },
  {
    order_num: 67, type: 'typein', section: 'Ambassador',
    text: 'Describe the three eligibility requirements to become a Vesta Ambassador, and explain what happens if an Ambassador stops buying NFTs for more than 30 days.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: 'Three requirements: (1) KYC Verified, (2) Accepted Community Bonus Policy and T&C, (3) Purchased at least one NFT on the Launchpad. If no NFT is purchased for 30+ days: the account is locked and tiered commission earnings pause. The Ambassador status is not permanently revoked – earnings resume once a new NFT is purchased.'
  },
  {
    order_num: 68, type: 'typein', section: 'Commission',
    text: 'An Ambassador has 15 qualified direct users and a full 8-level network. Explain which commission levels they have unlocked, and why having more direct users matters beyond just Level 1.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: 'With 15 qualified direct users: L1 (≥1 ✓), L2 (≥3 ✓), L3 (≥5 ✓), L4 (≥10 ✓), L5 (≥14 ✓) are unlocked – but NOT L6 (≥16), L7 (≥18), or L8 (≥20). Having more direct users matters because each level has a minimum threshold that must be met to earn from that depth. Without meeting the threshold, activity from users at that level generates zero commission even if they are in the network.'
  },
  {
    order_num: 69, type: 'typein', section: 'Pools',
    text: 'Explain the difference between the Leader Pool and the VIP Pool – who qualifies for each, what percentage each represents, and whether it is possible to qualify for both in the same month.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: 'Leader Pool: 2% of total monthly paid bonuses, shared equally among the Top 10 Ambassadors by personal bonus volume that month. VIP Pool: 1% of total monthly paid bonuses, shared equally among all Ambassadors with ≥5 active referrals at Level 8. Both in the same month: Yes – if an Ambassador is in the Top 10 by volume AND maintains ≥5 active L8 referrals, they receive a share of both pools in addition to their regular tiered commissions.'
  },
  {
    order_num: 70, type: 'typein', section: 'Claims',
    text: 'Walk through the full process of claiming a commission on Vesta – from what balance status is required, to what fees apply, to what the Ambassador must provide and verify before confirming.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: '1. The bonus must be in Available status (not Pending). 2. Available balance must be at least 0.05 USD. 3. Click Claim Now on the Ambassador Dashboard. 4. Enter ERC-20 wallet address – double-check carefully as transactions cannot be reversed. 5. Fees: $2.00 flat platform fee + 1% withdrawal fee. 6. Payout is in USDC sent directly to the wallet address provided.'
  },
  {
    order_num: 71, type: 'typein', section: 'Regulation',
    text: 'Give ONE concrete example of something an Ambassador should NOT say when promoting a Vesta NFT to a prospective investor, and explain which regulatory principle it would violate and why.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: 'Example: "This NFT guarantees you a 15% annual return." Violation: MiFID 2 – this violates the principle of transparency and investor protection. Returns on real-world asset NFTs are projections based on underlying asset performance, not guaranteed outcomes. Stating a fixed guaranteed return is misleading and could constitute unlawful financial advice.'
  },
  {
    order_num: 72, type: 'typein', section: 'Core NFT',
    text: 'A prospective investor is considering purchasing a Vesta Core NFT. List FOUR pieces of information an Ambassador should understand and communicate to the investor before the purchase is made.',
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: 'Any 4 of: (1) What real-world asset the NFT represents. (2) How revenue sharing or returns are structured. (3) The risks associated with the underlying real-world asset. (4) The regulatory compliance status of the NFT collection. (5) Who the founders of the project are and their credibility. (6) That the purchase is final – no refunds. (7) That returns are projections, not guarantees. (8) That the investor must be KYC verified before purchasing.'
  },
  {
    order_num: 73, type: 'typein', section: 'Ambassador',
    text: "You are an Ambassador and someone you referred two months ago messages you: \"I referred 4 people but I haven't earned any commissions yet. What's going on?\" List at least THREE possible reasons why they might not be earning commissions yet.",
    allow_multiple: null, options: [], correct_answers: [],
    model_answer: "Any 3+ of: (1) Their 4 referrals may not all be qualified – some may not have completed KYC, accepted T&C, or purchased an NFT. (2) They may have stopped buying NFTs themselves for more than 30 days, locking their account. (3) Some purchases may still be in Pending status, not yet Available. (4) Their commissions may be Available on the dashboard but not yet claimed. (5) With only 4 direct users they have unlocked L1 and L2 only – if no referrals have purchased NFTs, no commissions are triggered. (6) Their referrals may have purchased but do not meet all three qualifying conditions."
  }
]

async function seed() {
  console.log('Deleting existing questions...')
  await supabase.from('questions').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  console.log('Inserting questions...')
  const { error } = await supabase.from('questions').insert(questions)

  if (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }

  console.log(`✅ Seeded ${questions.length} questions successfully`)
  process.exit(0)
}

seed()
