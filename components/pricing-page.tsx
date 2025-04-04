'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight, Check, X, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { IBM_Plex_Sans, Space_Mono } from 'next/font/google'
import Image from 'next/image'
import { useState } from "react"

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
    description: <>Simple, effective choice for smaller communities or those just starting out</>,
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
      "1 TG group",
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
      "1 TG group",
      "Up to 20 TGAs",
      "Balance checks every 24 hours",
      "Priority support",
      "AND/OR conditions",
      "Customize Welcome Message",
      "All features from STARTER",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
]

// ----- FAQs -----
const faqs = [
  {
    question: "What is a Tokenized Community?",
    answer: "A Tokenized Community is a server/group where access, roles, or perks are granted based on members owning specific digital assets, like tokens or NFTs. Holding these tokens acts as a \"membership pass,\" letting members join, engage, and access exclusive content or privileges within the group.",
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
    answer: "This feature helps ensure that members meet the qualifications required to remain in your server or group. For members on the Starter tier, balance checks occur every 7 days. Basic and higher tiers enjoy daily checks, occurring every 24 hours. Additionally, our Exclusive and higher tiers include 5 bonus \"admin-initiated\" balance checks per month, giving you extra control and flexibility.",
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
    answer: <>If you are interested in a new Blockchain or Wallet Integration, please let us know by filling out <a href="https://bit.ly/3M5lIAo" className="text-[#8C92AC] hover:text-[#FFC700]" target="_blank" rel="noopener noreferrer">this form</a>.</>,
  },
]
// ----- Supported Chains -----
const supportedChains = [
  { name: "Abstract", url: "https://www.abs.xyz" },
  { name: "Amoy (Polygon testnet)", url: "https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos" },
  { name: "ApeChain", url: "https://apechain.com" },
  { name: "ApeChain Curtis (Testnet)", url: "https://apechain.com" },
  { name: "Arbitrum Nova", url: "https://nova.arbitrum.io/" },
  { name: "Arbitrum One", url: "https://arbitrum.io/" },
  { name: "Astar zkEVM (Sunset)", url: "https://docs.astar.network/docs/learn/zkEVM/" },
  { name: "Avalanche", url: "https://avax.network" },
  { name: "BASE", url: "https://base.org" },
  { name: "Bitcoin", url: "https://bitcoin.org/bitcoin.pdf" },
  { name: "Bitlayer", url: "https://www.bitlayer.org/" },
  { name: "Blast", url: "https://blast.io" },
  { name: "BSC", url: "https://www.binance.com/" },
  { name: "Celo", url: "https://celo.org" },
  { name: "Core", url: "https://coredao.org" },
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
  { name: "Sahara AI (Testnet)", url: "https://saharalabs.ai" },
  { name: "SEI", url: "https://www.sei.io/" },
  { name: "Sepolia (Ethereum testnet)", url: "https://sepolia.dev/" },
  { name: "Shibarium", url: "https://shibarium.shib.io/" },
  { name: "Solana", url: "https://solana.com" },
  { name: "Tezos", url: "https://tezos.com/" },
  { name: "Unichain", url: "https://www.unichain.org" },
  { name: "Vitruveo", url: "https://www.vitruveo.xyz/" },
  { name: "XRPL", url: "https://xrpl.org" }
]

// Add the note here
const testnetNote = "Please note that blockchain testnets are for testing purposes only. Collab.Land reserves the right to suspend support for testnets at any time."

// ----- Supported Wallets -----
const supportedWallets = [
  { name: "Abstract Global Wallet", url: "https://www.abs.xyz" },
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
  { name: "Solflare", url: "https://www.solflare.com" },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  React.useEffect(() => {
    if (!carousel) {
      return
    }
  }, [carousel])

  return (
    <div className={`min-h-screen bg-[#1A1A40] text-[#E1E2E6] ${ibmPlexSans.className} overflow-x-hidden relative`}>
      <header className="fixed w-full top-0 z-[100] shadow-lg after:absolute after:inset-0 after:shadow-[0_4px_12px_rgba(0,0,0,0.2)] after:pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFC700] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFC700]/5 to-transparent pointer-events-none" />
        <nav className="bg-[#F5F1E6] px-2 py-3 flex flex-row items-center justify-between w-full relative min-h-[48px] z-50">
          <div className="flex items-center">
            <Link href="https://collab.land" className="transform transition-transform hover:scale-105">
              {/* Desktop logo */}
              <Image
                src="/Logo-Color.png"
                alt="Collab.Land"
                width={180}
                height={36}
                className="h-8 w-auto hover:brightness-110 transition-all hidden md:block"
                priority
              />
              {/* Mobile logo */}
              <Image
                src="/LogoIconColor.svg"
                alt="Collab.Land"
                width={32}
                height={32}
                className="h-8 w-auto hover:brightness-110 transition-all md:hidden"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`
                    text-base h-8 px-3 py-1 
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    font-bold
                    relative
                    group
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  About <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  z-[200]
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={4}
                align="center"
                side="bottom"
              >
                <div className="grid gap-1 relative z-10">
                  {[
                    { href: "https://collab.land/overview", label: "Overview" },
                    { href: "https://collab.land/team", label: "Team" },
                    { href: "https://docs.collab.land/help-docs/key-features/token", label: "$COLLAB" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="
                        block px-4 py-2 
                        text-[#1A1A40] 
                        text-base
                        font-bold
                        hover:bg-[#FFC700]/80 
                        hover:translate-x-1
                        transition-all duration-200
                        relative
                        group
                      "
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#1A1A40] group-hover:h-1/2 transition-all duration-200" />
                      {item.label}
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
                    text-base h-8 px-3 py-1 
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    font-bold
                    relative
                    group
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  Admins <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  z-[200]
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={4}
                align="center"
                side="bottom"
              >
                <div className="grid gap-1 relative z-10">
                  {[
                    { href: "https://cc.collab.land", label: "Command Center" },
                    { href: "https://docs.collab.land", label: "Docs" },
                    { href: "https://invite.collab.land", label: "Invite" },
                    { href: "https://bit.ly/3M5lIAo", label: "Integrations" },
                    { href: "https://pricing.collab.land", label: "Premium" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="
                        block px-4 py-2 
                        text-[#1A1A40] 
                        text-base
                        font-bold
                        hover:bg-[#FFC700]/80 
                        hover:translate-x-1
                        transition-all duration-200
                        relative
                        group
                      "
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#1A1A40] group-hover:h-1/2 transition-all duration-200" />
                      {item.label}
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
                    text-base h-8 px-3 py-1 
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    font-bold
                    relative
                    group
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  Resources <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  z-[200]
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={4}
                align="center"
                side="bottom"
              >
                <div className="grid gap-1 relative z-10">
                  {[
                    { href: "https://docs.collab.land", label: "Docs" },
                    { href: "https://bit.ly/3M5lIAo", label: "Integrations" },
                    { href: "https://collabland.substack.com/", label: "Newsletter" },
                    { href: "https://collab.land/security", label: "Security" },
                    { href: "https://collabland.freshdesk.com/support/tickets/new", label: "Support" },
                    { href: "https://medium.com/collab-land", label: "Updates" },
                    { href: "https://www.youtube.com/channel/UCmyt5i7JmBPd03r2eJ-EaMA", label: "YouTube" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="
                        block px-4 py-2 
                        text-[#1A1A40] 
                        text-base
                        font-bold
                        hover:bg-[#FFC700]/80 
                        hover:translate-x-1
                        transition-all duration-200
                        relative
                        group
                      "
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#1A1A40] group-hover:h-1/2 transition-all duration-200" />
                      {item.label}
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
                    text-base h-8 px-3 py-1 
                    text-[#1A1A40] hover:text-[#FFB800] 
                    transition-all duration-300 
                    ${spaceMono.className} 
                    font-bold
                    relative
                    group
                    hover:bg-[#FFC700]/10
                    data-[state=open]:bg-[#FFC700]/10
                  `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  Socials <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className={`
                  w-48 bg-[#FFC700] 
                  border-none rounded-lg shadow-lg 
                  ${spaceMono.className}
                  backdrop-blur-sm
                  relative
                  z-[200]
                  before:absolute before:inset-0 
                  before:border-2 before:border-black/10 
                  before:rounded-lg
                  after:absolute after:inset-0 
                  after:bg-gradient-to-b after:from-white/10 after:to-transparent 
                  after:rounded-lg after:pointer-events-none
                `}
                sideOffset={4}
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
                        block px-4 py-2 
                        text-[#1A1A40] 
                        text-base
                        font-bold
                        hover:bg-[#FFC700]/80 
                        hover:translate-x-1
                        transition-all duration-200
                        relative
                        group
                      "
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#1A1A40] group-hover:h-1/2 transition-all duration-200" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost"
            className="md:hidden text-[#1A1A40] hover:bg-[#FFC700]/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#F5F1E6] border-t border-[#FFC700]/20 shadow-lg">
              <div className="p-4 space-y-2">
                {[
                  {
                    title: 'About',
                    items: [
                      { href: "https://collab.land/overview", label: "Overview" },
                      { href: "https://collab.land/team", label: "Team" },
                      { href: "https://docs.collab.land/help-docs/key-features/token", label: "$COLLAB" }
                    ]
                  },
                  {
                    title: 'Admins',
                    items: [
                      { href: "https://cc.collab.land", label: "Command Center" },
                      { href: "https://docs.collab.land", label: "Docs" },
                      { href: "https://invite.collab.land", label: "Invite" },
                      { href: "https://bit.ly/3M5lIAo", label: "Integrations" },
                      { href: "https://pricing.collab.land", label: "Premium" }
                    ]
                  },
                  {
                    title: 'Resources',
                    items: [
                      { href: "https://docs.collab.land", label: "Docs" },
                      { href: "https://bit.ly/3M5lIAo", label: "Integrations" },
                      { href: "https://collabland.substack.com/", label: "Newsletter" },
                      { href: "https://collab.land/security", label: "Security" },
                      { href: "https://collabland.freshdesk.com/support/tickets/new", label: "Support" },
                      { href: "https://medium.com/collab-land", label: "Updates" },
                      { href: "https://www.youtube.com/channel/UCmyt5i7JmBPd03r2eJ-EaMA", label: "YouTube" }
                    ]
                  },
                  {
                    title: 'Socials',
                    items: [
                      { href: "https://discord.gg/collabland", label: "Discord" },
                      { href: "https://www.instagram.com/collab_land_", label: "Instagram" },
                      { href: "https://linktr.ee/collab_land_", label: "Linktree" },
                      { href: "https://twitter.com/Collab_Land_", label: "X" }
                    ]
                  }
                ].map((section) => (
                  <div key={section.title} className="border-b border-[#FFC700]/20 last:border-none">
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="flex items-center justify-between w-full py-2 text-[#1A1A40]"
                    >
                      <span className={`${spaceMono.className} font-bold`}>{section.title}</span>
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedSections.includes(section.title) ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {expandedSections.includes(section.title) && (
                      <div className="pl-4 pb-2 space-y-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block py-1.5 text-sm text-[#1A1A40]/80 hover:text-[#1A1A40] hover:translate-x-1 transition-all duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-[48px]">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
          <div className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-2xl font-bold text-[#FFC700] text-center mb-4">
              Subscription Plans
            </h1>
            <p className={`text-base text-center text-[#F5F1E6] mb-8 ${spaceMono.className}`}>
              No hidden fees. No surprises. Start for free and upgrade as you grow.
            </p>
            <Tabs defaultValue="discord" className="mb-8">
              <div className="max-w-5xl mx-auto md:px-0 px-12">
                <TabsList className="grid w-full max-w-[445px] mx-auto grid-cols-2 bg-[#F5F1E6] mb-6 p-1 h-10 rounded-lg relative overflow-hidden">
                  <TabsTrigger 
                    value="discord" 
                    className={`
                      text-[#1F2232] 
                      font-semibold 
                      transition-all 
                      duration-300
                      text-sm
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
                      px-20
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
                      text-sm
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
                      px-20
                    `}
                  >
                    Telegram
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="discord">
                <div className="relative px-4 sm:px-12">
                  <div className="flex flex-col">
                    <Carousel 
                      className="w-full max-w-5xl mx-auto" 
                      setApi={setCarousel}
                      opts={{
                        align: "start",
                        slidesToScroll: 1
                      }}
                    >
                      <CarouselContent className="-ml-1 sm:-ml-2">
                        {discordPlans.map((plan, index) => (
                          <CarouselItem 
                            key={plan.name} 
                            className="pl-1 sm:pl-2 basis-full sm:basis-1/2 md:basis-1/3"
                          >
                            <div className="p-0.5">
                              <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[450px] max-w-[240px] mx-auto">
                                <CardHeader className="flex-none pt-2 px-2 h-[100px] flex flex-col justify-between">
                                  <CardTitle className={`text-lg font-bold text-[#1A1A40] text-center ${spaceMono.className}`}>
                                    {plan.name}
                                  </CardTitle>
                                  <CardDescription className={`text-[#1A1A40]/80 text-center text-xs ${ibmPlexSans.className}`}>
                                    {plan.description}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow px-2">
                                  <div className="flex items-baseline justify-center mb-4 h-[40px]">
                                    <span className={`text-lg font-extrabold text-[#1A1A40] ${ibmPlexSans.className}`}>
                                      {plan.price}
                                    </span>
                                    {plan.period && <span className={`text-[#1A1A40]/80 ml-1 text-xs ${ibmPlexSans.className}`}>
                                      {plan.period}
                                    </span>}
                                  </div>
                                  <ul className={`space-y-0.5 mb-2 text-[#1A1A40] ${ibmPlexSans.className}`}>
                                    {plan.features.map((feature, index) => (
                                      <li key={index} className="flex items-start">
                                        <Check className="h-3.5 w-3.5 text-[#3A7D7B] mr-1 mt-0.5 flex-shrink-0" />
                                        <span className="text-xs leading-tight">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                                <CardFooter className="flex-none pb-2 px-2">
                                  <Button 
                                    asChild 
                                    className="w-full bg-[#FFC700] hover:bg-[#FFC700]/90 text-[#1A1A40] transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group h-8 text-sm font-medium"
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
                  {/* Mobile carousel */}
                  <div className="md:hidden">
                    <Carousel 
                      className="w-full max-w-5xl mx-auto" 
                      setApi={setCarousel}
                      opts={{
                        align: "start",
                        slidesToScroll: 1
                      }}
                    >
                      <CarouselContent className="-ml-1 sm:-ml-2">
                        {telegramPlans.map((plan, index) => (
                          <CarouselItem 
                            key={plan.name} 
                            className="pl-1 sm:pl-2 basis-full sm:basis-1/2 md:basis-1/3"
                          >
                            <div className="p-0.5">
                              <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[450px] max-w-[240px] mx-auto">
                                <CardHeader className="flex-none pt-2 px-2 h-[100px] flex flex-col justify-between">
                                  <CardTitle className={`text-lg font-bold text-[#1A1A40] text-center ${spaceMono.className}`}>
                                    {plan.name}
                                  </CardTitle>
                                  <CardDescription className={`text-[#1A1A40]/80 text-center text-xs ${ibmPlexSans.className}`}>
                                    {plan.description}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow px-2">
                                  <div className="flex items-baseline justify-center mb-4 h-[40px]">
                                    <span className={`text-lg font-extrabold text-[#1A1A40] ${ibmPlexSans.className}`}>
                                      {plan.price}
                                    </span>
                                    {plan.period && <span className={`text-[#1A1A40]/80 ml-1 text-xs ${ibmPlexSans.className}`}>
                                      {plan.period}
                                    </span>}
                                  </div>
                                  <ul className={`space-y-0.5 mb-2 text-[#1A1A40] ${ibmPlexSans.className}`}>
                                    {plan.features.map((feature, index) => (
                                      <li key={index} className="flex items-start">
                                        <Check className="h-3.5 w-3.5 text-[#3A7D7B] mr-1 mt-0.5 flex-shrink-0" />
                                        <span className="text-xs leading-tight">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                                <CardFooter className="flex-none pb-2 px-2">
                                  <Button 
                                    asChild 
                                    className="w-full bg-[#FFC700] hover:bg-[#FFC700]/90 text-[#1A1A40] transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group h-8 text-sm font-medium"
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

                    {/* Add mobile carousel controls */}
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
                  </div>

                  {/* Desktop grid - adjusted spacing */}
                  <div className="hidden md:flex justify-center gap-2 max-w-3xl mx-auto">
                    {telegramPlans.map((plan, index) => (
                      <div key={plan.name} className="p-0.5 w-[220px]">
                        <Card className="bg-[#F5F1E6]/95 border-2 border-[#4A4A7E] flex flex-col h-[450px]">
                          <CardHeader className="flex-none pt-2 px-2 h-[100px] flex flex-col justify-between">
                            <CardTitle className={`text-lg font-bold text-[#1A1A40] text-center ${spaceMono.className}`}>
                              {plan.name}
                            </CardTitle>
                            <CardDescription className={`text-[#1A1A40]/80 text-center text-xs ${ibmPlexSans.className}`}>
                              {plan.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow px-2">
                            <div className="flex items-baseline justify-center mb-4 h-[40px]">
                              <span className={`text-lg font-extrabold text-[#1A1A40] ${ibmPlexSans.className}`}>
                                {plan.price}
                              </span>
                              {plan.period && <span className={`text-[#1A1A40]/80 ml-1 text-xs ${ibmPlexSans.className}`}>
                                {plan.period}
                              </span>}
                            </div>
                            <ul className={`space-y-0.5 mb-2 text-[#1A1A40] ${ibmPlexSans.className}`}>
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-3.5 w-3.5 text-[#3A7D7B] mr-1 mt-0.5 flex-shrink-0" />
                                  <span className="text-xs leading-tight">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="flex-none pb-2 px-2">
                            <Button 
                              asChild 
                              className="w-full bg-[#FFC700] hover:bg-[#FFC700]/90 text-[#1A1A40] transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group h-8 text-sm font-medium"
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
        <section className="bg-[#1A1A40] pt-4 pb-8 px-4 sm:px-6 lg:px-8 border-t-2 border-b-2 border-[#3A3A6E]">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <div className="mb-6 pb-6 border-b-2 border-[#3A3A6E] w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#FFC700]">
                Supported Chains and Networks
              </h2>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-8 sm:px-12">
                {supportedChains.map((chain, index) => (
                  <div key={index} className={`text-[#F5F1E6] mb-4 text-sm ${spaceMono.className} list-item ml-4`}>
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
              <p className={`text-center mt-4 mb-8 text-[#F5F1E6] text-xs ${spaceMono.className}`}>
                {testnetNote}
              </p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#FFC700]">
                Supported Wallets and Verifications
              </h2>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-8 sm:px-12">
                {supportedWallets.map((wallet, index) => (
                  <div key={index} className={`text-[#F5F1E6] mb-4 text-sm ${spaceMono.className} list-item ml-4`}>
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
              <p className={`text-center mt-12 text-[#F5F1E6] text-xs ${spaceMono.className}`}>
                If you are interested in a new Blockchain or Wallet Integration, please let us know by filling out{' '}
                <a 
                  href="https://bit.ly/3M5lIAo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#F5F1E6] hover:text-[#FFC700]"
                >
                  this form
                </a>
              </p>
            </div>
          </div>
        </section>
        {/* Add the comparison table right after the supported chains and wallets section, but before the FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#FFC700]">
            Plans Comparison
          </h2>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <div className="md:max-w-[720px] mx-auto">
              <table className="w-full rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-[#FFC700]/95">
                    <th className={`
                      p-2 text-left font-semibold text-[#1A1A40] 
                      ${spaceMono.className} 
                      first:rounded-tl-lg 
                      text-xs
                      w-[30%]
                    `}>
                      FEATURES
                    </th>
                    {tiers.map((tier, index) => (
                      <th key={tier} className={`
                        p-2 text-center font-semibold text-[#1A1A40] 
                        ${spaceMono.className} 
                        text-xs
                        ${index === tiers.length - 1 ? 'rounded-tr-lg' : ''}
                      `}>
                        {tier}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={feature.name} className={index % 2 === 0 ? 'bg-[#F5F1E6]/95' : 'bg-[#F5F1E6]/90'}>
                      <td className="p-2 font-medium text-[#1A1A40] text-xs">{feature.name}</td>
                      {feature.values.map((value, i) => (
                        <td key={i} className="p-2 text-center text-[#1A1A40]/80 text-xs">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="inline-block w-4 h-4 text-[#3A7D7B]" />
                            ) : (
                              <X className="inline-block w-4 h-4 text-red-500" />
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
            <Accordion type="single" collapsible className="space-y-2">
              {features.map((feature, index) => (
                <AccordionItem 
                  key={index} 
                  value={`feature-${index}`}
                  className="bg-[#F5F1E6]/95 rounded-lg border border-[#4A4A7E]"
                >
                  <AccordionTrigger className="px-3 py-2 text-[#1A1A40] font-medium text-xs">
                    {feature.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-3 pb-2 space-y-1">
                      {tiers.map((tier, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-[#1A1A40]">{tier}</span>
                          <span className="text-[#1A1A40]/80">
                            {typeof feature.values[i] === 'boolean' ? (
                              feature.values[i] ? (
                                <Check className="inline-block w-4 h-4 text-[#3A7D7B]" />
                              ) : (
                                <X className="inline-block w-4 h-4 text-red-500" />
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
            </Accordion>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="pt-4 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1A40] border-t-2 border-b-2 border-[#3A3A6E] relative">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl font-bold text-center mb-4 text-[#FFC700]">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-[#F5F1E6]/95 rounded-lg overflow-hidden border-2 border-[#4A4A7E]"
                >
                  <AccordionTrigger 
                    className="px-4 py-2.5 text-left hover:bg-[#FFC700]/95 text-[#1A1A40] font-semibold text-xs"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className={`px-4 pt-2 pb-3 text-[#1A1A40]/80 text-xs ${spaceMono.className}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      {/* Footer section */}
      <footer className="bg-[#FFC700] py-2">
        <div className="w-full px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 max-w-[1920px] mx-auto">
            {/* Links */}
            <nav className="flex space-x-4 order-2 sm:order-1">
              <Link 
                href="https://www.collab.land/privacy-policy" 
                className={`text-xs sm:text-sm font-bold text-[#1A1A40] hover:text-[#1A1A40]/80 ${spaceMono.className}`}
              >
                Privacy Policy
              </Link>
              <Link 
                href="https://www.collab.land/terms-of-service" 
                className={`text-xs sm:text-sm font-bold text-[#1A1A40] hover:text-[#1A1A40]/80 ${spaceMono.className}`}
              >
                Terms
              </Link>
            </nav>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 order-1 sm:order-2">
              {[
                { href: "https://linktr.ee/collab_land_", icon: "/LinktreeIcon.svg", alt: "Linktree" },
                { href: "https://discord.gg/collabland", icon: "/DiscordIcon.svg", alt: "Discord" },
                { href: "https://x.com/collab_land_", icon: "/XIcon.svg", alt: "X (formerly Twitter)" }
              ].map((social) => (
                <Link key={social.href} href={social.href} target="_blank">
                  <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-1 hover:bg-transparent group">
                    <Image 
                      src={social.icon}
                      alt={social.alt}
                      width={16}
                      height={16}
                      className="transition-all duration-200 group-hover:scale-110 group-hover:brightness-75 sm:w-5 sm:h-5"
                    />
                  </Button>
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 text-[#1A1A40] order-3 ${spaceMono.className}`}>
              <Image 
                src="/LogoIcon.svg" 
                alt="Collab.Land Logo" 
                width={14}
                height={14}
                className="inline-block sm:w-[18px] sm:h-[18px]"
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