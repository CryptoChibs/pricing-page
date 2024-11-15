'use client'

import * as React from "react"
import { ChevronDown, Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { IBM_Plex_Sans, Space_Mono } from 'next/font/google'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// ----- Pricing Data (Discord)-----
const discordPlans = [
  {
    name: "Starter",
    price: "Free",
    description: <>For small communities just getting <br/>started</>,
    features: [
      "Up to 4 TGRs",
      "Unlimited members",
      "Balance checks every week",
      "Standard Support",
      "Multi-wallet verification",
      "38 blockchains",
      "28 wallets, Delegate, OpenSea + WalletConnect",
    ],
    cta: "Subscribe Now",
  },
  {
    name: "Basic",
    price: "$17.99",
    period: "/month",
    description: "For growing communities needing more frequent checks",
    features: [
      "Up to 10 TGRs",
      "Balance checks every 24 hours",
      "Priority Support",
      "Opt-out feature for donate",
      "All features from STARTER",
    ],
    cta: "Subscribe Now",
  },
  {
    name: "Premium",
    price: "$35",
    period: "/month",
    description: "For established communities requiring advanced features",
    features: [
      "Up to 50 TGRs",
      "PRO miniapps, including Role Composition (And/Or) and POAP",
      "Opt-out feature for community messages",
      "All features from STARTER + BASIC",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
  {
    name: "Exclusive",
    price: "$149",
    period: "/month",
    description: "For large communities needing dedicated support",
    features: [
      "Up to 150 TGRs",
      "5 Bonus 'admin-initiated' balance checks monthly",
      "Dedicated support human",
      "Customize your Discord verification channel's Let's Go! message",
      "All features from STARTER + BASIC + PREMIUM",
    ],
    cta: "Subscribe Now",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For communities needing full customization",
    features: [
      "Unlimited TGRs",
      "White label",
      "Change the bot's username",
      "Change logo",
      "Personalized features on demand",
      "All features from Exclusive included",
    ],
    cta: "Contact Us",
  },
]

// ----- Pricing Data (Telegram) -----
const telegramPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "For small communities\njust getting started",
    features: [
      "1 TG Group",
      "1 TGA",
      "Unlimited members",
      "Balance checks every week",
      "Standard support",
      "Multi-wallet verification",
      "38 blockchains",
      "28 wallets, Delegate, OpenSea + WalletConnect",
    ],
    cta: "Subscribe Now",
  },
  {
    name: "Premium",
    price: "$35",
    period: "/month",
    description: "For established Telegram communities requiring advanced features",
    features: [
      "Up to 10 TG groups",
      "Up to 5 TGAs/per group",
      "Balance checks every 24 hours",
      "Priority support",
      "AND/OR conditions",
      "Customize Welcome Message",
      "All features from STARTER included",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
]

// ----- FAQs -----
const faqs = [
  {
    question: "What is a Tokenized Community?",
    answer: "A Tokenized Community is a server/group where access, roles, or perks are granted based on members owning specific digital assets, like tokens or NFTs. Holding these tokens acts as a “membership pass,” letting members join, engage, and access exclusive content or privileges within the group. ",
  },
  {
    question: "What is Token Gating?",
    answer: "Token Gating is a system that controls access to specific roles or areas in communities on platforms like Discord and Telegram based on token ownership. This allows communities to create exclusive spaces and benefits for token-holders.",
  }, 
  {
    question: "What are TGRs and TGAs?",
    answer: "TGRs are rules that determine which roles a member will be assigned in a Discord server based on token-related criteria defined by the community admin. For example, a Token Gating Rule (TGR) may grant access to a 'VIP' role for members who hold a certain number of tokens. Token Granted Access (TGAs) works similarly for Telegram, but they only apply to whole groups, not individual topics, channels, or bots within a group.",
  },
  {
    question: "What are balance checks and how often are they performed?",
    answer: "This feature helps ensure that members meet the qualifications required to remain in your server or group. For members on the Starter tier, balance checks occur every 7 days. Basic and higher tiers enjoy daily checks, occurring every 24 hours. Additionally, our Exclusive and higher tiers include 5 bonus “admin-initiated” balance checks per month, giving you extra control and flexibility.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: <>Yes, you can upgrade or downgrade your plan at any time. To do so, please reach out to us via a support ticket, preferably through the <a href="https://cc.collab.land" className="text-[#3A7D7B] hover:text-[#2A5D5B] underline" target="_blank" rel="noopener noreferrer">Command Center</a> (use the Support button after logging in)</>,
  },
  {
    question: "What are PRO miniapps?",
    answer: "PRO miniapps are advanced features available in higher-tier plans. They include tools like Role Composition (And/Or logic for role assignment) and POAP integration for event-based roles.",
  },
  {
    question: "Does the Collab.Land bot need administrator permissions in my server?",
    answer: "No it doesn't. However, it will need the following permissions to work properly: View Channels, Manage Channels, Manage Roles, Ban Members and Send Messages.",
  },
  {
    question: "How can I request a new Blockchain or Wallet?",
    answer: <>If you are interested in a new Blockchain or Wallet Integration, please let us know by filling out <a href="https://bit.ly/3M5lIAo" className="text-[#3A7D7B] hover:text-[#2A5D5B] underline" target="_blank" rel="noopener noreferrer">this form</a>.</>,
  },
]
// ----- Supported Chains -----
const supportedChains = [
  "Amoy (Polygon testnet)", "Arbitrum Nova", "Arbitrum One", "Astar zkEVM", "Avalanche", "BASE", "Bitlayer", "Blast",
  "Bitcoin", "BSC", "Celo", "DOS Chain", "Eluvio", "Ethereum Mainnet", "Flow", "Friend.Tech", "Gitcoin Passport",
  "Gnosis", "Immutable X", "Kusama", "Linea", "Loopring", "Moonbeam", "NEAR", "Nifty", "Optimism", "Palm", "Polkadot",
  "Polygon", "Q Chain", "Ronin", "SEI", "Sepolia (Ethereum testnet)", "Shibarium", "Solana", "Tezos", "Vitruveo", "XRPL"
]
// ----- Supported Wallets -----
const supportedWallets = [
  "Bitski", "Blocto", "Coinbase Wallet", "Dapper", "Delegate", "Eluvio", "Fortmatic", "Friend.Tech", "ImmutableX",
  "Leather", "Ledger", "Loopring", "MEWconnect", "MetaMask", "Near", "Nifty Gateway", "OpenSea", "Opolis", "Phantom",
  "Phantom EVM", "Ronin", "Roll", "Safe", "Talisman", "Temple (Tezos)", "TokenProof", "Trezor", "Venly", "WalletConnect(V2)",
  "Xumm", "Xverse"
]

// ----- Comparison Data -----
const tiers = ['STARTER', 'BASIC', 'PREMIUM', 'EXCLUSIVE', 'ENTERPRISE']

const features = [
  { name: 'TGRs (Token Gating Rules)', values: ['Up to 4', 'Up to 10', 'Up to 50', 'Up to 150', 'Unlimited'] },
  { name: 'Multi-wallet verification', values: [true, true, true, true, true] },
  { name: 'Access to 35+ blockchains', values: [true, true, true, true, true] },
  { name: 'Access to 25+ wallets, Delegate, OpenSea + WalletConnect', values: [true, true, true, true, true] },
  { name: 'Priority support', values: [false, true, true, true, true] },
  { name: 'Opt-out feature for donate', values: [false, true, true, true, true] },
  { name: 'Opt-out feature for community messages', values: [false, false, true, true, true] },
  { name: 'PRO miniapp bundle', values: [false, false, true, true, true] },
  { name: 'Balance checks frequency', values: ['Every 7 days', 'Every 24h', 'Every 24h', 'Every 24h', 'Every 24h'] },
  { name: 'Bonus "admin-initiated" balance checks', values: [false, false, false, 'Up to 5/mo', 'Upon Request'] },
  { name: 'Customize your Discord verification channel\'s "Let\'s Go!" message', values: [false, false, false, true, true] },
  { name: 'Dedicated support human', values: [false, false, false, true, true] },
  { name: 'CollabCare premium support', values: [false, false, false, false, true] },
  { name: 'White label (your own custom bot)', values: [false, false, false, false, true] },
  { name: 'Personalized features on demand', values: [false, false, false, false, true] },
]

const prices = ['Free', '$17.99', '$35', '$149', 'Custom']

// ----- Pricing Page Component -----
export function PricingPage() {
  return (
    <div className={`min-h-screen bg-[#1A1A40] text-[#E1E2E6] ${ibmPlexSans.className}`}>
      <header className="px-4 py-6">
        <nav className="bg-[#F5F1E6] rounded-full px-8 py-6 flex items-center justify-between max-w-7xl mx-auto relative">
          <div className="flex flex-col items-start gap-0">
            <Link href="https://linktr.ee/collab_land_" className={`text-[#1A1A40] hover:text-[#FFB800] transition-colors ${spaceMono.className} text-base font-bold`}>
              Socials
            </Link>
            <Link href="https://collabland.substack.com" className={`text-[#1A1A40] hover:text-[#FFB800] transition-colors ${spaceMono.className} text-base font-bold`}>
              Articles
            </Link>
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color_logo_wordmark-2Pg8pcGf6uxVyIG3c4fFeUeLrxDpEh.png" 
              alt="Collab.Land Logo" 
              className="h-24 w-auto"
            />
          </div>
          <div className="flex flex-col items-end gap-0">
            <Link href="https://cc.collab.land/login" className={`text-[#1A1A40] hover:text-[#FFB800] transition-colors ${spaceMono.className} text-base font-bold`}>
              Admin Portal
            </Link>
            <Link href="https://docs.collab.land" className={`text-[#1A1A40] hover:text-[#FFB800] transition-colors ${spaceMono.className} text-base font-bold`}>
              Docs
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
          <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F5F1E6] text-center text-shadow-sm">Subscription Plans</h1>
            <p className={`text-xl text-center text-[#B8B9BE] mb-12 ${spaceMono.className}`}>
            No hidden fees. No surprises. Start for free and upgrade as you grow.
            </p>
            <Tabs defaultValue="discord" className="mb-16">
              <TabsList className="grid w-full grid-cols-2 bg-[#F5F1E6] mb-8 p-1 h-12">
                <TabsTrigger 
                  value="discord" 
                  className="data-[state=active]:bg-[#FFC700] text-[#1F2232] data-[state=active]:text-[#1F2232] font-semibold transition-colors text-lg h-full"
                >
                  Discord 
                </TabsTrigger>
                <TabsTrigger 
                  value="telegram" 
                  className="data-[state=active]:bg-[#FFC700] text-[#1F2232] data-[state=active]:text-[#1F2232] font-semibold transition-colors text-lg h-full"
                >
                  Telegram 
                </TabsTrigger>
              </TabsList>
              <TabsContent value="discord">
                <div className="relative px-12">
                  <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                      {discordPlans.map((plan, index) => (
                        <CarouselItem key={plan.name} className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[600px] shadow-neon">
                              <CardHeader>
                                <CardTitle className="text-2xl font-bold text-[#1A1A40] text-center">{plan.name}</CardTitle>
                                <CardDescription className="text-[#1A1A40]/80 text-center">{plan.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow overflow-y-auto">
                                <div className="flex items-baseline justify-center mb-6 h-[40px]">
                                  <span className="text-4xl font-extrabold text-[#1A1A40]">{plan.price}</span>
                                  {plan.period && <span className="text-[#1A1A40]/80 ml-1">{plan.period}</span>}
                                </div>
                                <ul className="space-y-2 mb-6 pb-4 text-[#1A1A40]">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                      <Check className="h-5 w-5 text-[#3A7D7B] mr-2 mt-0.5 flex-shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                              <CardFooter className="pt-6">
                                <Button 
                                  asChild 
                                  className="w-full bg-[#FFC700] hover:bg-[#FFC700]/90 text-[#1A1A40] shadow-neon-button transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
                                >
                                  {plan.cta === "Contact Us" ? (
                                    <a href="mailto:anjali@collab.land">
                                      <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></span>
                                      <span className="relative z-10">{plan.cta}</span>
                                    </a>
                                  ) : (
                                    <Link href="https://cc.collab.land/login">
                                      <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></span>
                                      <span className="relative z-10">{plan.cta}</span>
                                    </Link>
                                  )}
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] transition-colors rounded-full p-2">
                      <ChevronLeft className="w-8 h-8 text-[#F5F1E6]" />
                    </CarouselPrevious>
                    <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] transition-colors rounded-full p-2">
                      <ChevronRight className="w-8 h-8 text-[#F5F1E6]" />
                    </CarouselNext>
                  </Carousel>
                </div>
              </TabsContent>
              <TabsContent value="telegram">
                <div className="relative px-12">
                  <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="flex justify-center">
                      {telegramPlans.map((plan, index) => (
                        <CarouselItem key={plan.name} className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[600px] shadow-neon">
                              <CardHeader>
                                <CardTitle className="text-2xl font-bold text-[#1A1A40] text-center">{plan.name}</CardTitle>
                                <CardDescription className="text-[#1A1A40]/80 text-center">{plan.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow overflow-y-auto">
                                <div className="flex items-baseline justify-center mb-6 h-[40px]">
                                  <span className="text-4xl font-extrabold text-[#1A1A40]">{plan.price}</span>
                                  {plan.period && <span className="text-[#1A1A40]/80 ml-1">{plan.period}</span>}
                                </div>
                                <ul className="space-y-2 mb-6 pb-4 text-[#1A1A40]">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                      <Check className="h-5 w-5 text-[#3A7D7B] mr-2 mt-0.5 flex-shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                              <CardFooter className="pt-6">
                                <Button 
                                  asChild 
                                  className="w-full bg-[#FFC700] hover:bg-[#FFC700]/90 text-[#1A1A40] shadow-neon-button transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
                                >
                                  {plan.cta === "Contact Us" ? (
                                    <a href="mailto:anjali@collab.land">
                                      <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></span>
                                      <span className="relative z-10">{plan.cta}</span>
                                    </a>
                                  ) : (
                                    <Link href="https://cc.collab.land/login">
                                      <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></span>
                                      <span className="relative z-10">{plan.cta}</span>
                                    </Link>
                                  )}
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        {/* ----- Supported Chains and Wallets Style----- */}
        <section className="bg-[#1A1A40] py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-b-2 border-[#3A3A6E]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 pb-12 border-b-2 border-[#3A3A6E]">
              <h2 className="text-3xl font-bold text-center mb-8 text-[#F5F1E6] text-shadow-glow">Supported Chains and Networks</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-disc list-inside">
                {supportedChains.map((chain, index) => (
                  <li key={index} className="text-[#B8B9BE]">
                    {chain}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-center mb-8 text-[#F5F1E6] text-shadow-glow">Supported Wallets and Verifications</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-disc list-inside">
                {supportedWallets.map((wallet, index) => (
                  <li key={index} className="text-[#B8B9BE]">
                    {wallet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* Add the comparison table right after the supported chains and wallets section, but before the FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F5F1E6]">Plans Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#FFC700]/95">
                  <th className={`p-3 text-left font-semibold text-[#1A1A40] ${spaceMono.className}`}>FEATURES</th>
                  {tiers.map((tier) => (
                    <th key={tier} className={`p-3 text-center font-semibold text-[#1A1A40] ${spaceMono.className}`}>{tier}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? 'bg-[#F5F1E6]/95' : 'bg-[#F5F1E6]/90'}>
                    <td className="p-3 font-medium text-[#1A1A40]">{feature.name}</td>
                    {feature.values.map((value, i) => (
                      <td key={i} className="p-3 text-center text-[#1A1A40]/80">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="inline-block w-5 h-5 text-[#3A7D7B]" />
                          ) : (
                            <X className="inline-block w-5 h-5 text-red-500" />
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className={features.length % 2 === 0 ? 'bg-[#F5F1E6]/95' : 'bg-[#F5F1E6]/90'}>
                  <td className="p-3 font-semibold text-[#1A1A40]">Monthly Price</td>
                  {prices.map((price, index) => (
                    <td key={index} className="p-3 text-center font-semibold text-[#1A1A40]">{price}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* ----- FAQs Style----- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A40] border-t-2 border-b-2 border-[#3A3A6E] relative">
          <div 
            className="absolute right-[80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-contain bg-no-repeat bg-right" 
            style={{ backgroundImage: 'url("/2.png")' }}
          />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#F5F1E6] text-shadow-glow">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-[#F5F1E6]/95 rounded-lg overflow-hidden border-2 border-[#4A4A7E] shadow-neon"
                >
                  <AccordionTrigger 
                    className="px-6 py-4 text-left hover:bg-[#FFC700]/95 text-[#1A1A40] font-semibold"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="px-6 pt-4 pb-6 text-[#1A1A40]/80"
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      {/* Footer section with privacy policy and terms of service links */}
      <footer className="bg-[#FFC700] text-[#1A1A40] py-2 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <Link href="https://www.collab.land/privacy-policy" className={`hover:underline ${spaceMono.className} text-sm font-bold`}>
              Privacy Policy
            </Link>
            <Link href="https://www.collab.land/terms-of-service" className={`hover:underline ${spaceMono.className} text-sm font-bold`}>
              Terms of Service
            </Link>
          </div>
          <div className={`text-sm font-bold ${spaceMono.className}`}>©Collab.Land 2024</div>
        </div>
      </footer>
    </div>
  )
}

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
})