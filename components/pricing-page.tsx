'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight, Check, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { IBM_Plex_Sans, Space_Mono } from 'next/font/google'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CarouselApi } from "@/components/ui/carousel"

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
  { name: "Amoy (Polygon testnet)", url: "https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos" },
  { name: "Arbitrum Nova", url: "https://nova.arbitrum.io/" },
  { name: "Arbitrum One", url: "https://arbitrum.io/" },
  { name: "Astar zkEVM", url: "https://astar.network/" },
  { name: "Avalanche", url: "https://avax.network" },
  { name: "BASE", url: "https://base.org" },
  { name: "Bitcoin", url: "https://bitcoin.org/bitcoin.pdf" },
  { name: "Bitlayer", url: "https://www.bitlayer.org/" },
  { name: "Blast", url: "https://blast.io" },
  { name: "BSC", url: "https://www.binance.com/" },
  { name: "Celo", url: "https://celo.org" },
  { name: "DOS Chain", url: "https://doschain.com/" },
  { name: "Eluvio", url: "https://eluv.io" },
  { name: "Ethereum Mainnet", url: "https://ethereum.org/" },
  { name: "Flow", url: "https://flow.com/" },
  { name: "Gitcoin Passport", url: "https://www.passport.xyz/" },
  { name: "Gnosis", url: "https://www.gnosis.io/" },
  { name: "Immutable X", url: "https://www.immutable.com/products/immutable-x" },
  { name: "Kusama", url: "https://kusama.network/" },
  { name: "Linea", url: "https://linea.build/" },
  { name: "Loopring", url: "https://loopring.io" },
  { name: "Moonbeam", url: "https://moonbeam.network/" },
  { name: "NEAR", url: "https://near.org" },
  { name: "Nifty", url: "https://www.niftygateway.com/" },
  { name: "Optimism", url: "https://www.optimism.io/" },
  { name: "Palm", url: "https://palm.network/" },
  { name: "Polkadot", url: "https://polkadot.com/" },
  { name: "Polygon", url: "https://polygon.technology/" },
  { name: "Q Chain", url: "https://q.foundation/" },
  { name: "Ronin", url: "https://roninchain.com" },
  { name: "SEI", url: "https://www.sei.io/" },
  { name: "Sepolia (Ethereum testnet)", url: "https://sepolia.dev/" },
  { name: "Shibarium", url: "https://shibarium.shib.io/" },
  { name: "Solana", url: "https://solana.com" },
  { name: "Tezos", url: "https://tezos.com/" },
  { name: "Vitruveo", url: "https://www.vitruveo.xyz/" },
  { name: "XRPL", url: "https://xrpl.org" }
]
// ----- Supported Wallets -----
const supportedWallets = [
  { name: "Bitski", url: "https://www.bitski.com/" },
  { name: "Blocto", url: "https://blocto.app/" },
  { name: "Coinbase Wallet", url: "https://www.coinbase.com/wallet" },
  { name: "Dapper", url: "https://www.dapperlabs.com/" },
  { name: "Delegate", url: "https://delegate.xyz" },
  { name: "Eluvio", url: "https://eluv.io/media-wallet" },
  { name: "Fortmatic", url: "https://fortmatic.com/" },
  { name: "ImmutableX", url: "https://www.immutable.com/" },
  { name: "Ledger", url: "https://www.ledger.com/" },
  { name: "Loopring", url: "https://loopring.org/" },
  { name: "MEWconnect", url: "https://www.myetherwallet.com/" },
  { name: "MetaMask", url: "https://metamask.io/" },
  { name: "NEAR", url: "https://near.org/" },
  { name: "Nifty Gateway", url: "https://niftygateway.com/" },
  { name: "OpenSea", url: "https://opensea.io/" },
  { name: "Opolis", url: "https://opolis.co/" },
  { name: "Phantom", url: "https://phantom.app/" },
  { name: "Phantom EVM", url: "https://phantom.app/" },
  { name: "Ronin", url: "https://roninchain.com/" },
  { name: "Roll", url: "https://demo.tryroll.com" },
  { name: "Safe", url: "https://gnosis-safe.io/" },
  { name: "Talisman", url: "https://talisman.xyz/" },
  { name: "Temple (Tezos)", url: "https://templewallet.com/" },
  { name: "TokenProof", url: "https://tokenproof.xyz" },
  { name: "Trezor", url: "https://trezor.io/" },
  { name: "Venly", url: "https://venly.io/" },
  { name: "WalletConnect(V2)", url: "https://walletconnect.network" },
  { name: "Xumm", url: "https://xumm.app/" },
  { name: "Xverse", url: "https://xverse.app/" }
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
  const [carousel, setCarousel] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!carousel) {
      return
    }
  }, [carousel])

  return (
    <div className={`min-h-screen bg-[#1A1A40] text-[#E1E2E6] ${ibmPlexSans.className}`}>
      <header className="relative sticky top-0 z-50 shadow-lg after:absolute after:inset-0 after:shadow-[0_4px_12px_rgba(0,0,0,0.2)] after:pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFC700] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFC700]/5 to-transparent pointer-events-none" />
        <nav className="bg-[#F5F1E6] rounded-none px-2 sm:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between w-full relative min-h-[56px] z-50">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link href="/" className="transform transition-transform hover:scale-105">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color_logo_wordmark-2Pg8pcGf6uxVyIG3c4fFeUeLrxDpEh.png"
                alt="Collab.Land"
                width={600}
                height={120}
                className="h-11 w-auto hover:brightness-110 transition-all"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    text-base font-bold
                    relative
                    group
                    px-4
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  Admins <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" data-state="closed" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={8}
                align="center"
                side="bottom"
              >
                <div className="grid gap-1 relative z-10">
                  {[
                    { href: "https://cc.collab.land", label: "Command Center" },
                    { href: "https://docs.collab.land/help-docs/intro", label: "Docs" },
                    { href: "https://invite.collab.land", label: "Invite" },
                    { href: "https://bit.ly/3M5lIAo", label: "Integrations" },
                    { href: "https://pricing.collab.land", label: "Premium" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="
                        text-[#1A1A40] 
                        transition-all 
                        text-base font-bold
                        px-3 py-2.5 
                        rounded-lg
                        hover:bg-black/10 
                        flex items-center justify-center 
                        relative
                        group
                        border border-transparent
                        hover:border-black/10
                        hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]
                        before:absolute before:inset-0 
                        before:bg-gradient-to-r before:from-transparent 
                        before:via-white/5 before:to-transparent 
                        before:opacity-0 before:group-hover:opacity-100
                        before:transition-opacity before:duration-300
                        text-center 
                      "
                    >
                      <span className="relative z-10 group-hover:text-[#1A1A40]/80">{item.label}</span>
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-r from-black/0 via-black/5 to-black/0 
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 
                        rounded-lg
                      "/>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    text-base font-bold
                    relative
                    group
                    px-4
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  Resources <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" data-state="closed" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={8}
                align="center"
                side="bottom"
              >
                <div className="grid gap-1 relative z-10">
                  {[
                    { href: "https://docs.collab.land", label: "Docs" },
                    { href: "https://bit.ly/3M5lIAo", label: "Integrations" },
                    { href: "https://collabland.substack.com/", label: "Newsletter" },
                    { href: "https://collabland.freshdesk.com/support/tickets/new", label: "Support" },
                    { href: "https://medium.com/collab-land", label: "Updates" },
                    { href: "https://www.youtube.com/channel/UCmyt5i7JmBPd03r2eJ-EaMA", label: "YouTube" },
                    { href: "https://docs.collab.land/dao/token/token_overview", label: "$COLLAB" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="
                        text-[#1A1A40] 
                        transition-all 
                        text-base font-bold
                        px-3 py-2.5 
                        rounded-lg
                        hover:bg-black/10 
                        flex items-center justify-center
                        relative
                        group
                        border border-transparent
                        hover:border-black/10
                        hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]
                        before:absolute before:inset-0 
                        before:bg-gradient-to-r before:from-transparent 
                        before:via-white/5 before:to-transparent 
                        before:opacity-0 before:group-hover:opacity-100
                        before:transition-opacity before:duration-300
                      "
                    >
                      <span className="relative z-10 group-hover:text-[#1A1A40]/80">{item.label}</span>
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-r from-black/0 via-black/5 to-black/0 
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 
                        rounded-lg
                      "/>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    text-base font-bold
                    relative
                    group
                    px-4
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  Socials <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" data-state="closed" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={8}
                align="center"
                side="bottom"
              >
                <div className="grid gap-1 relative z-10">
                  {[
                    { href: "https://discord.gg/collabland", label: "Discord" },
                    { href: "https://www.instagram.com/collab_land_", label: "Instagram" },
                    { href: "https://linktr.ee/collab_land_", label: "Linktree" },
                    { href: "https://twitter.com/Collab_Land_", label: "X" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="
                        text-[#1A1A40] 
                        transition-all 
                        text-base font-bold
                        px-3 py-2.5 
                        rounded-lg
                        hover:bg-black/10 
                        flex items-center justify-center
                        relative
                        group
                        border border-transparent
                        hover:border-black/10
                        hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]
                        before:absolute before:inset-0 
                        before:bg-gradient-to-r before:from-transparent 
                        before:via-white/5 before:to-transparent 
                        before:opacity-0 before:group-hover:opacity-100
                        before:transition-opacity before:duration-300
                      "
                    >
                      <span className="relative z-10 group-hover:text-[#1A1A40]/80">{item.label}</span>
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-r from-black/0 via-black/5 to-black/0 
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 
                        rounded-lg
                      "/>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12">
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ 
              backgroundImage: 'url("/Hexagons-4.svg")',
              backgroundSize: 'clamp(400px, 120%, 1200px)',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              left: '-45%',
              transform: 'translateX(clamp(-200px, -20vw, 0px))',
            }} 
          />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-bold text-[#F5F1E6] text-center text-shadow-sm">Subscription Plans</h1>
            <p className={`text-lg text-center text-[#B8B9BE] mb-8 ${spaceMono.className}`}>
              No hidden fees. No surprises. Start for free and upgrade as you grow.
            </p>
            <Tabs defaultValue="discord" className="mb-12">
              <div className="max-w-5xl mx-auto md:px-0 px-12">
                <TabsList className="grid w-full grid-cols-2 bg-[#F5F1E6] mb-6 p-1.5 h-12 rounded-lg relative overflow-hidden">
                  <TabsTrigger 
                    value="discord" 
                    className={`
                      text-[#1F2232] 
                      font-semibold 
                      transition-all 
                      duration-300
                      text-lg 
                      h-full
                      relative
                      rounded-md
                      data-[state=active]:font-bold
                      data-[state=active]:text-[#1F2232]
                      data-[state=active]:bg-[#FFC700]
                      data-[state=active]:shadow-[inset_0_0_12px_rgba(255,255,255,0.3)]
                      hover:bg-[#FFC700]/20
                      data-[state=active]:hover:bg-[#FFC700]
                      z-10
                    `}
                  >
                    Discord
                  </TabsTrigger>
                  <TabsTrigger 
                    value="telegram" 
                    className={`
                      text-[#1F2232] 
                      font-semibold 
                      transition-all 
                      duration-300
                      text-lg 
                      h-full
                      relative
                      rounded-md
                      data-[state=active]:font-bold
                      data-[state=active]:text-[#1F2232]
                      data-[state=active]:bg-[#FFC700]
                      data-[state=active]:shadow-[inset_0_0_12px_rgba(255,255,255,0.3)]
                      hover:bg-[#FFC700]/20
                      data-[state=active]:hover:bg-[#FFC700]
                      z-10
                    `}
                  >
                    Telegram
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="discord">
                <div className="relative px-4 sm:px-12">
                  <div className="flex flex-col">
                    <Carousel className="w-full max-w-5xl mx-auto" setApi={setCarousel}>
                      <CarouselContent className="-ml-2 sm:-ml-4">
                        {discordPlans.map((plan, index) => (
                          <CarouselItem 
                            key={plan.name} 
                            className="pl-2 sm:pl-4 basis-full md:basis-1/2 xl:basis-1/3"
                          >
                            <div className="p-1">
                              <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[650px] shadow-neon">
                                <CardHeader className="flex-none pt-6 px-6">
                                  <CardTitle className="text-2xl font-bold text-[#1A1A40] text-center">{plan.name}</CardTitle>
                                  <CardDescription className="text-[#1A1A40]/80 text-center min-h-[48px]">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow px-6">
                                  <div className="flex items-baseline justify-center mb-6">
                                    <span className="text-4xl font-extrabold text-[#1A1A40]">{plan.price}</span>
                                    {plan.period && <span className="text-[#1A1A40]/80 ml-1">{plan.period}</span>}
                                  </div>
                                  <ul className="space-y-2 mb-6 text-[#1A1A40]">
                                    {plan.features.map((feature, index) => (
                                      <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-[#3A7D7B] mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                                <CardFooter className="flex-none pb-6 px-6">
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
                      <CarouselPrevious className="
                        hidden md:flex
                        absolute 
                        -left-4 md:-left-12 
                        top-1/2 
                        transform -translate-y-1/2 
                        bg-[#242457] 
                        border border-[#4A4A7E] 
                        hover:bg-[#3A3A6E] 
                        transition-colors 
                        rounded-full 
                        p-1 md:p-2
                        scale-75 md:scale-100
                      "/>
                      <CarouselNext className="
                        hidden md:flex
                        absolute 
                        -right-4 md:-right-12 
                        top-1/2 
                        transform -translate-y-1/2 
                        bg-[#242457] 
                        border border-[#4A4A7E] 
                        hover:bg-[#3A3A6E] 
                        transition-colors 
                        rounded-full 
                        p-1 md:p-2
                        scale-75 md:scale-100
                      "/>
                    </Carousel>

                    <div className="flex justify-center gap-4 mt-6 md:hidden">
                      <button
                        onClick={() => carousel?.scrollPrev()}
                        className="bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] rounded-full p-3 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-[#F5F1E6]" />
                      </button>
                      <button
                        onClick={() => carousel?.scrollNext()}
                        className="bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] rounded-full p-3 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-[#F5F1E6]" />
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="telegram">
                <div className="relative px-4 sm:px-12">
                  {/* Show carousel only on mobile */}
                  <div className="md:hidden">
                    <Carousel 
                      className="w-full max-w-5xl mx-auto" 
                      setApi={setCarousel}
                      opts={{
                        align: "start",
                        slidesToScroll: 1,
                        containScroll: "trimSnaps"
                      }}
                    >
                      <CarouselContent className="-ml-2">
                        {telegramPlans.map((plan, index) => (
                          <CarouselItem key={plan.name} className="pl-2 basis-full">
                            <div className="p-1">
                              <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[650px] shadow-neon">
                                <CardHeader className="flex-none pt-6 px-6">
                                  <CardTitle className="text-2xl font-bold text-[#1A1A40] text-center">{plan.name}</CardTitle>
                                  <CardDescription className="text-[#1A1A40]/80 text-center min-h-[48px]">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow px-6">
                                  <div className="flex items-baseline justify-center mb-6">
                                    <span className="text-4xl font-extrabold text-[#1A1A40]">{plan.price}</span>
                                    {plan.period && <span className="text-[#1A1A40]/80 ml-1">{plan.period}</span>}
                                  </div>
                                  <ul className="space-y-2 mb-6 text-[#1A1A40]">
                                    {plan.features.map((feature, index) => (
                                      <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-[#3A7D7B] mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                                <CardFooter className="flex-none pb-6 px-6">
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
                      {/* Mobile controls for Telegram */}
                      <div className="flex justify-center gap-4 mt-6">
                        <button
                          onClick={() => carousel?.scrollPrev()}
                          className="bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] rounded-full p-3 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6 text-[#F5F1E6]" />
                        </button>
                        <button
                          onClick={() => carousel?.scrollNext()}
                          className="bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] rounded-full p-3 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6 text-[#F5F1E6]" />
                        </button>
                      </div>
                    </Carousel>
                  </div>

                  {/* Desktop grid layout remains unchanged */}
                  <div className="hidden md:grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {telegramPlans.map((plan, index) => (
                      <div key={plan.name} className="p-1 max-w-[400px] w-full mx-auto">
                        <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[650px] shadow-neon">
                          <CardHeader className="flex-none pt-6 px-6">
                            <CardTitle className="text-2xl font-bold text-[#1A1A40] text-center">{plan.name}</CardTitle>
                            <CardDescription className="text-[#1A1A40]/80 text-center min-h-[48px]">{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow px-6">
                            <div className="flex items-baseline justify-center mb-6">
                              <span className="text-4xl font-extrabold text-[#1A1A40]">{plan.price}</span>
                              {plan.period && <span className="text-[#1A1A40]/80 ml-1">{plan.period}</span>}
                            </div>
                            <ul className="space-y-2 mb-6 text-[#1A1A40]">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-5 w-5 text-[#3A7D7B] mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm sm:text-base">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="flex-none pb-6 px-6">
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
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        {/* ----- Supported Chains and Wallets Style----- */}
        <section className="bg-[#1A1A40] py-12 px-4 sm:px-6 lg:px-8 border-t-2 border-b-2 border-[#3A3A6E]">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <div className="mb-8 pb-8 border-b-2 border-[#3A3A6E] w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#F5F1E6] text-shadow-glow">Supported Chains and Networks</h2>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-8 sm:px-12">
                {supportedChains.map((chain, index) => (
                  <div key={index} className="text-[#B8B9BE] flex items-center pl-4 mb-4">
                    <div className="w-2 h-2 rotate-45 bg-[#FFC700] mr-2 flex-shrink-0 transform -translate-y-[1px]" />
                    <a 
                      href={chain.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="line-clamp-2 hover:text-[#FFC700] transition-colors"
                    >
                      {chain.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#F5F1E6] text-shadow-glow">Supported Wallets and Verifications</h2>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-8 sm:px-12">
                {supportedWallets.map((wallet, index) => (
                  <div key={index} className="text-[#B8B9BE] flex items-center pl-4 mb-4">
                    <div className="w-2 h-2 rotate-45 bg-[#FFC700] mr-2 flex-shrink-0 transform -translate-y-[1px]" />
                    <a 
                      href={wallet.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="line-clamp-2 hover:text-[#FFC700] transition-colors"
                    >
                      {wallet.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Add the comparison table right after the supported chains and wallets section, but before the FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#F5F1E6]">Plans Comparison</h2>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <div className="md:max-w-[720px] lg:max-w-none mx-auto">
              <table className="w-full md:min-w-0 lg:min-w-[800px] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#FFC700]/95">
                    <th className={`p-2 md:p-3 text-left font-semibold text-[#1A1A40] ${spaceMono.className} first:rounded-tl-lg md:w-[35%] lg:w-auto text-sm md:text-base`}>FEATURES</th>
                    {tiers.map((tier, index) => (
                      <th key={tier} className={`p-2 md:p-3 text-center font-semibold text-[#1A1A40] ${spaceMono.className} md:w-[13%] lg:w-auto text-sm md:text-base ${
                        index === tiers.length - 1 ? 'rounded-tr-lg' : ''
                      }`}>{tier}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Update cell padding in tbody too */}
                  {features.map((feature, index) => (
                    <tr key={feature.name} className={index % 2 === 0 ? 'bg-[#F5F1E6]/95' : 'bg-[#F5F1E6]/90'}>
                      <td className="p-2 md:p-3 font-medium text-[#1A1A40] text-sm md:text-base">{feature.name}</td>
                      {feature.values.map((value, i) => (
                        <td key={i} className="p-2 md:p-3 text-center text-[#1A1A40]/80 text-sm md:text-base">
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
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="space-y-4">
              {features.map((feature, index) => (
                <AccordionItem 
                  key={index} 
                  value={`feature-${index}`}
                  className="bg-[#F5F1E6]/95 rounded-lg border-2 border-[#4A4A7E]"
                >
                  <AccordionTrigger className="px-4 py-3 text-[#1A1A40] font-medium">
                    {feature.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 pb-4 space-y-2">
                      {tiers.map((tier, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="font-semibold text-[#1A1A40]">{tier}</span>
                          <span className="text-[#1A1A40]/80">
                            {typeof feature.values[i] === 'boolean' ? (
                              feature.values[i] ? (
                                <Check className="inline-block w-5 h-5 text-[#3A7D7B]" />
                              ) : (
                                <X className="inline-block w-5 h-5 text-red-500" />
                              )
                            ) : (
                              feature.values[i]
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {/* Price Row */}
              <AccordionItem 
                value="price"
                className="bg-[#F5F1E6]/95 rounded-lg border-2 border-[#4A4A7E]"
              >
                <AccordionTrigger className="px-4 py-3 text-[#1A1A40] font-medium">
                  Monthly Price
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-4 space-y-2">
                    {tiers.map((tier, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="font-semibold text-[#1A1A40]">{tier}</span>
                        <span className="text-[#1A1A40]/80">{prices[i]}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A40] border-t-2 border-b-2 border-[#3A3A6E] relative">
          <div 
            className="absolute right-0 sm:right-[80px] top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-contain bg-no-repeat bg-right opacity-10 sm:opacity-100" 
            style={{ backgroundImage: 'url("/2.png")' }}
          />
          
          <div 
            className="absolute right-0 top-0 w-full h-full opacity-40 pointer-events-none"
            style={{ 
              backgroundImage: 'url("/Hexagons-4.svg")',
              backgroundSize: 'clamp(400px, 100%, 1000px)',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              right: 'clamp(-150px, -15vw, 0px)',
            }} 
          />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#F5F1E6] text-shadow-glow">
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
      <footer className="bg-[#FFC700] py-4">
        <div className="w-full px-6 md:px-12">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 max-w-[1920px] mx-auto">
            <nav className="flex space-x-6 self-start sm:self-center">
              <Link href="https://www.collab.land/privacy-policy" className={`text-[#1A1A40] hover:text-[#1A1A40]/80 transition-colors text-base ${spaceMono.className} font-bold`}>
                Privacy Policy
              </Link>
              <Link href="https://www.collab.land/terms-of-service" className={`text-[#1A1A40] hover:text-[#1A1A40]/80 transition-colors text-base ${spaceMono.className} font-bold`}>
                Terms
              </Link>
            </nav>
            <div className="flex justify-center items-center space-x-4">
              <Link href="https://linktr.ee/collab_land_" passHref>
                <Button size="icon" variant="ghost" className="hover:bg-transparent hover:text-[#1A1A40]/80 flex items-center justify-center">
                  <Image src="/LinktreeIcon.svg" alt="Linktree" width={24} height={24} />
                  <span className="sr-only">Linktree</span>
                </Button>
              </Link>
              <Link href="https://discord.gg/collabland" passHref>
                <Button size="icon" variant="ghost" className="hover:bg-transparent hover:text-[#1A1A40]/80 flex items-center justify-center">
                  <Image src="/DiscordIcon.svg" alt="Discord" width={24} height={24} />
                  <span className="sr-only">Discord</span>
                </Button>
              </Link>
              <Link href="https://twitter.com/Collab_Land_" passHref>
                <Button size="icon" variant="ghost" className="hover:bg-transparent hover:text-[#1A1A40]/80 flex items-center justify-center">
                  <Image src="/XIcon.svg" alt="X (formerly Twitter)" width={24} height={24} />
                  <span className="sr-only">X (formerly Twitter)</span>
                </Button>
              </Link>
            </div>
            <p className={`text-[#1A1A40] text-base ${spaceMono.className} font-bold flex items-center gap-2`}>
              <Image 
                src="/LogoIcon.svg" 
                alt="Collab.Land Logo" 
                width={24} 
                height={24} 
                className="inline-block"
              />
              Collab.Land® 2024
            </p>
          </div>
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