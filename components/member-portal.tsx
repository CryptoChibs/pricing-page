'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Loader2, CheckCircle, MessageSquare, MoreHorizontal, Search, X, Copy, Check, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Globe, Users, Shield, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link"
import { IBM_Plex_Sans, Space_Mono } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const generateRandomAddress = (type: string) => {
  switch (type) {
    case 'EVM':
      return '0x' + Math.random().toString(36).substring(2, 38).padStart(40, '0')
    case 'FLOW':
      return Math.random().toString(36).substring(2, 18)
    case 'NEAR':
      return Math.random().toString(36).substring(2, 12) + '.near'
    case 'SOLANA':
      return Math.random().toString(36).substring(2, 46)
    case 'TEZOS':
      return 'tz1' + Math.random().toString(36).substring(2, 34)
    default:
      return '0x' + Math.random().toString(36).substring(2, 38).padStart(40, '0')
  }
}

const initialWallets = [
  { type: 'MetaMask', address: generateRandomAddress('EVM'), icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tcLMixY9lTL2hM7EyDycpQWMq23qlX.png" alt="MetaMask logo" className="w-6 h-6" /> },
  { type: 'NEAR', address: generateRandomAddress('NEAR'), icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8fkXMKg6vCOLG0quKLnBOt188hOIeL.png" alt="Near logo" className="w-6 h-6" /> },
  { type: 'Solana', address: generateRandomAddress('SOLANA'), icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vLcVCT6xPvYhWqPoXsWiEADluaKcJF.png" alt="Solana logo" className="w-6 h-6" /> },
  { type: 'TEZOS', address: generateRandomAddress('TEZOS'), icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OQm6y04f8q7xawlGgvOVulNjqhiAKZ.png" alt="Tezos logo" className="w-6 h-6" /> },
]

const walletOptions = [
  { name: "Bitski", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PzdRbwok4bj4FKTdH6DELZkCCfHIIk.png" alt="Bitski logo" className="w-6 h-6" /> },
  { name: "Blocto", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e8qgd4zcDzgLwFTPsaKPp0OJFlENhX.png" alt="Blocto logo" className="w-6 h-6" /> },
  { name: "Coinbase Wallet", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ULZX54zBioT3a0PA9VBFYIIjO1F8tq.png" alt="Coinbase Wallet logo" className="w-6 h-6" /> },
  { name: "Dapper", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nvFpEhe0ZrLhAl6OQDR5qXfLjGGEaX.png" alt="Dapper logo" className="w-6 h-6" /> },
  { name: "Delegate", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-83rqAxXPbk4hq8yaH6fk5i5taYqbtY.png" alt="Delegate logo" className="w-6 h-6" /> },
  { name: "Eluvio", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hpGVhDI11qyHAHCSYnzdoHmQw8RxOZ.png" alt="Eluvio logo" className="w-6 h-6" /> },
  { name: "Fortmatic", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KLfpfoxhjw0iUWbo9qM5Efw38FSIPg.png" alt="Fortmatic logo" className="w-6 h-6" /> },
  { name: "Friend.Tech", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HYGnydsv2LR3EpcpvtVSKxHBLmqlr0.png" alt="Friend.Tech logo" className="w-6 h-6" /> },
  { name: "ImmutableX", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-veaDbiAkrZk47vy1VVvVj7E6s5PBAJ.png" alt="ImmutableX logo" className="w-6 h-6" /> },
  { name: "Leather", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Cy0tY3RW1so6ioMv0R7uRMZpmr4GSB.png" alt="Leather logo" className="w-6 h-6" /> },
  { name: "Ledger (Metamask)", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nevIXzHE3SkuM4EqJQfxY0i0MU8ZgB.png" alt="Ledger logo" className="w-6 h-6" /> },
  { name: "Loopring", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RO0Lp7doXKkoHPj2pva4NzwGeFubPZ.png" alt="Loopring logo" className="w-6 h-6" /> },
  { name: "MEWconnect", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FmKW6zr2sdL7KiRfNYgmkgrllmJGH0.png" alt="MEWconnect logo" className="w-6 h-6" /> },
  { name: "MetaMask", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tcLMixY9lTL2hM7EyDycpQWMq23qlX.png" alt="MetaMask logo" className="w-6 h-6" /> },
  { name: "Near", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8fkXMKg6vCOLG0quKLnBOt188hOIeL.png" alt="Near logo" className="w-6 h-6" /> },
  { name: "Nifty Gateway", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Pb2g9bzrRhiUWfl9WiGPIWMUA9J71M.png" alt="Nifty Gateway logo" className="w-6 h-6" /> },
  { name: "OpenSea", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kfxYraCUI8wUGoK4zSv7lAwoSLxvrO.png" alt="OpenSea logo" className="w-6 h-6" /> },
  { name: "Opolis", icon: "🏙️" },
  { name: "Phantom EVM", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vizqVo1kPpAPEpxSr7LFcLhnjrrMTU.png" alt="Phantom EVM logo" className="w-6 h-6" /> },
  { name: "Roll", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6rkkOj7ooi8vvQwv0b9IQC8tyuK6ho.png" alt="Roll logo" className="w-6 h-6" /> },
  { name: "Safe", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MrLrHH30Sf6Kk0qBfznaFFaXbOLYEB.png" alt="Safe logo" className="w-6 h-6" /> },
  { name: "Talisman", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FQOvSNnkslTmD3N2hxIWg7PFyRDG0D.png" alt="Talisman logo" className="w-6 h-6" /> },
  { name: "Temple (Tezos)", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OQm6y04f8q7xawlGgvOVulNjqhiAKZ.png" alt="Tezos logo" className="w-6 h-6" /> },
  { name: "TokenProof", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wV3Q7Rc6UKA1ktzUafhZfLE3SK1vfP.png" alt="TokenProof logo" className="w-6 h-6" /> },
  { name: "Trezor", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WHFy85uIOl9g3d3qsJS5RGrIhbOtxt.png" alt="Trezor logo" className="w-6 h-6" /> },
  { name: "Venly", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fleOydiGVDm7ErrAfuELpErdA8S0po.png" alt="Venly logo" className="w-6 h-6" /> },
  { name: "WalletConnect(V2)", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RDWk0HduxUaZTzqg1ZATIYWKUo4HLI.png" alt="WalletConnect logo" className="w-6 h-6" /> },
  { name: "Xumm", icon: "💧" },
  { name: "Xverse", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p4tjeeIbXeGVfKkvWs3QGsjAowF41A.png" alt="Xverse logo" className="w-6 h-6" /> },
  { name: "Solana", icon: <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vLcVCT6xPvYhWqPoXsWiEADluaKcJF.png" alt="Solana logo" className="w-6 h-6" /> },
]

const getWalletIcon = (type: string) => {
  const wallet = walletOptions.find(w => w.name === type) || initialWallets.find(w => w.type === type);
  return wallet && wallet.icon ? wallet.icon : '👛';
}

interface UserInfo {
  username: string;
  avatar: string;
  communityName: string;
  communityId: string;
  interactionId: string;
}

const userInfo: UserInfo = {
  username: "cwispychibi#0",
  avatar: "/placeholder.svg?height=40&width=40",
  communityName: "The Collab.Land Discord",
  communityId: "904119310702772254",
  interactionId: "1300860653463933029"
}

const WalletModal = ({ isOpen, onClose, onConnect, setSelectedWallet }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredWallets = walletOptions.filter(wallet => 
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#242457] border-[#4A4A7E] text-[#F5F1E6]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Connect a Wallet</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search wallets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#313179] border-[#4A4A7E] text-[#F5F1E6]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F1E6] h-4 w-4" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-[#F5F1E6]" />
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 max-h-[400px] overflow-y-auto">
          {filteredWallets.map((wallet) => (
            <button
              key={wallet.name}
              className="flex items-center justify-center p-4 min-h-[80px] bg-[#313179] rounded-lg hover:bg-[#3A3A6E] transition-colors"
              onClick={() => {
                setSelectedWallet(wallet.name);
                onConnect(wallet.name);
              }}
            >
              <span className="text-2xl mr-2">{typeof wallet.icon === 'string' ? wallet.icon : wallet.icon}</span>
              <span className="text-center break-words">{wallet.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AdPopup = ({ isOpen, onClose, onContinue, isWalletAdded = false }) => {
  const [progress, setProgress] = useState(0)
  const [showContinue, setShowContinue] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setProgress(0)
      setShowContinue(false)
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current)
            setShowContinue(true)
            return 100
          }
          return prev + 1
        })
      }, 150)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#242457] border-[#4A4A7E] text-[#F5F1E6]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Special Offer</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-[#313179] p-4 rounded-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Square%20In-House%20Ad%20Sample-V4fq56e94sYD4ZK4xiYztQiPjjJVAL.png"
              alt="Community message billboard with mascot"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="mt-4 text-center">
            <AnimatePresence mode="wait">
              {!showContinue && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-2">{isWalletAdded ? "Adding wallet, please wait..." : "Checking for eligibility, please wait..."}</p>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-[#313179] stroke-current"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-[#FFC700] stroke-current"
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold">{progress}%</span>
                    </div>
                  </div>
                </motion.div>
              )}
              {showContinue && (
                <motion.div
                  key="continue"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button onClick={onContinue} className="mt-4 bg-[#FFC700] text-[#1A1A40] hover:bg-[#FFD700]">
                    Continue
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const RolesGrantedModal = ({ isOpen, onClose, roles }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#242457] border-[#4A4A7E] text-[#F5F1E6]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Roles Granted</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ul className="list-disc list-inside space-y-1">
            {roles.map((role, index) => (
              <li key={index} className="text-[#FFC700]">{role}</li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-[#FFC700] text-[#1A1A40] hover:bg-[#FFD700]">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const recommendedCommunities = [
  {
    id: 1,
    name: "The Collab.Land Discord",
    description: "Collab.Land is the original full-service community management tool that curates membership based on tokens.",
    memberCount: 51200,
    roleCount: 10,
    socials: {
      twitter: "https://twitter.com/cryptoexplorers",
      facebook: "https://facebook.com/cryptoexplorers",
      instagram: "https://instagram.com/cryptoexplorers",
      website: "https://cryptoexplorers.com"
    },
    discordLink: "https://discord.gg/cryptoexplorers",
    image: "/CollabLand.png"
  },
  {
    id: 2,
    name: "Icy Seals",
    description: "The magical seal world",
    memberCount: 30000,
    roleCount: 8,
    socials: {
      twitter: "https://twitter.com/icyseals",
      instagram: "https://instagram.com/icyseals",
      website: "https://icyseals.com"
    },
    discordLink: "https://discord.gg/icyseals",
    image: "/IcySeals.png"
  },
  {
    id: 3,
    name: "ACE's Universe",
    description: "Explore the futuristic universe of ACE",
    memberCount: 6372,
    roleCount: 6,
    socials: {
      twitter: "https://twitter.com/acebot",
      facebook: "https://facebook.com/acebot",
      website: "https://acebot.com"
    },
    discordLink: "https://discord.gg/acebot",
    image: "/AcesUniverse.png"
  },
  {
    id: 4,
    name: "接続",
    description: "ACE の Land は、トークンに基づいてメンバーシップを管理する、オリジナルのフルサービス コミュニティ管理ツールです。",
    memberCount: 5000,
    roleCount: 6,
    socials: {
      twitter: "https://twitter.com/nftcollectors",
      instagram: "https://instagram.com/nftcollectors",
      website: "https://nftcollectors.com"
    },
    discordLink: "#",
    image: "/owo.png"
  },
  {
    id: 5,
    name: "Your Community!",
    description: "Your description",
    memberCount: 1,
    roleCount: 1,
    socials: {
      twitter: "https://twitter.com/none",
      facebook: "https://facebook.com/none",
      website: "https://none.com"
    },
    discordLink: "#",
    image: "/YourCommunity.png"
  },
]

const CommunityCard = ({ community }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [community.description]);

  const handleJoin = () => {
    window.open(community.discordLink, '_blank')
    console.log(`Granting special role for joining ${community.name}`)
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
    >
      <Card className={`w-full flex flex-col bg-[#242457] border-[#4A4A7E] text-[#F5F1E6] transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[500px]'}`}>
        <CardHeader className="flex-shrink-0 p-0">
          <div className="w-full h-[200px]">
            <Image
              src={community.image}
              alt={`${community.name} community image`}
              width={640}
              height={360}
              className="w-full h-full object-contain"
              priority={community.id <= 3}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-6 pb-8">
          <div className="flex-grow">
            <CardTitle className="text-xl font-bold truncate mb-2">{community.name}</CardTitle>
            <CardDescription 
              ref={descriptionRef}
              onClick={() => isOverflowing && setIsExpanded(!isExpanded)}
              className={`text-[#B8B8D9] mb-6 ${isExpanded ? '' : 'line-clamp-2'} 
                ${isOverflowing ? 'cursor-pointer hover:text-[#F5F1E6] transition-colors' : ''}`}
            >
              {community.description}
            </CardDescription>
            <div className="flex justify-between mb-6">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>
                  {community.memberCount >= 1000 
                    ? `${(community.memberCount / 1000).toFixed(0)}k`
                    : community.memberCount
                  } members
                </span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>{community.roleCount} TGRs</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {community.socials.twitter && (
                <a href={community.socials.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-[#F5F1E6] hover:text-[#FFC700]" />
                </a>
              )}
              {community.socials.facebook && (
                <a href={community.socials.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-[#F5F1E6] hover:text-[#FFC700]" />
                </a>
              )}
              {community.socials.instagram && (
                <a href={community.socials.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-[#F5F1E6] hover:text-[#FFC700]" />
                </a>
              )}
              {community.socials.github && (
                <a href={community.socials.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-[#F5F1E6] hover:text-[#FFC700]" />
                </a>
              )}
              {community.socials.website && (
                <a href={community.socials.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-5 w-5 text-[#F5F1E6] hover:text-[#FFC700]" />
                </a>
              )}
            </div>
          </div>
          <Button className="w-full mt-8 bg-[#FFC700] text-[#1A1A40] hover:bg-[#FFD700]" onClick={handleJoin}>
            Join Community
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const FeaturedCommunities = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 3 })
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="w-full max-w-7xl mx-auto px-12 py-7 relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {recommendedCommunities.map((community) => (
            <div key={community.id} className="flex-[0_0_33.33%] min-w-0 px-4">
              <CommunityCard community={community} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] transition-colors rounded-full p-2"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-8 h-8 text-[#F5F1E6]" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#242457] border border-[#4A4A7E] hover:bg-[#3A3A6E] transition-colors rounded-full p-2"
        onClick={scrollNext}
      >
        <ChevronRight className="w-8 h-8 text-[#F5F1E6]" />
      </button>
    </div>
  )
}

const PersonalizedInfo = () => (
  <div className="space-y-4">
    <h4 className="text-lg font-semibold text-[#F5F1E6]">Personalized Information</h4>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">👤</span>
      <span className="text-[#F5F1E6]">{userInfo.username}</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">👑</span>
      <div className="flex flex-col">
        <span className="text-[#F5F1E6]">{userInfo.communityName}</span>
        <span className="text-[#FFC700] text-sm">{userInfo.communityId}</span>
            </div>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">💬</span>
      <div className="flex flex-col">
        <span className="text-[#F5F1E6]">Interaction Id</span>
        <span className="text-[#FFC700] text-sm">{userInfo.interactionId}</span>
      </div>
    </div>
  </div>
)

export function MemberPortal() {
  const [wallets, setWallets] = useState(initialWallets)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedWallet, setExpandedWallet] = useState<number | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [copiedWallet, setCopiedWallet] = useState<number | null>(null)
  const [isAdPopupOpen, setIsAdPopupOpen] = useState(false)
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false)
  const [grantedRoles, setGrantedRoles] = useState<string[]>([])
  const [isWalletAdded, setIsWalletAdded] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState("")

  const disconnectWallet = (index: number) => {
    setWallets(wallets.filter((_, i) => i !== index))
  }

  const addNewWallet = async (walletName: string) => {
    setIsLoading(true);
    setIsWalletModalOpen(false);
    setIsWalletAdded(true);
    setIsAdPopupOpen(true);
    setSelectedWallet(walletName);
  }

  const toggleWalletExpansion = (index: number) => {
    setExpandedWallet(expandedWallet === index ? null : index)
  }

  const verifyWallets = async () => {
    setIsVerifying(true)
    setIsWalletAdded(false)
    setIsAdPopupOpen(true)

    // Simulate getting granted roles
    const simulatedRoles = [
      "COLLAB Holder 10+",
      "COLLAB Holder 280K+",
      "Member NFT holder",
      "DAO Pass",
      "DAO Member"
    ]
    setGrantedRoles(simulatedRoles)
  }

  const copyToClipboard = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedWallet(index)
      setTimeout(() => setCopiedWallet(null), 2000)
    })
  }, [])

  return (
    <div className={`min-h-screen bg-[#1A1A40] text-[#F5F1E6] flex flex-col ${ibmPlexSans.className}`}>
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="bg-[#F5F1E6] rounded-full px-8 py-6 flex items-center justify-between max-w-7xl mx-auto relative">
          <div className="flex flex-col items-start gap-0">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFD700] flex items-center justify-center text-3xl bg-[#242457]">
                    👤
                  </div>
                  <MoreHorizontal className="text-[#1A1A40] w-8 h-8" />
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFD700] flex items-center justify-center text-3xl bg-[#242457]">
                    👑
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-[#242457] border-[#4A4A7E]">
                <PersonalizedInfo />
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color_logo_wordmark-2Pg8pcGf6uxVyIG3c4fFeUeLrxDpEh.png" 
              alt="Collab.Land Logo" 
              className="h-24 w-auto"
            />
          </div>
          <div className="flex flex-col items-end gap-0">
            <Link href="https://cc.collab.land/login" className={`text-[#1A1A40] hover:text-[#FFB800] transition-colors text-base font-bold ${spaceMono.className}`}>
              Admin Portal
            </Link>
            <Link href="https://docs.collab.land" className={`text-[#1A1A40] hover:text-[#FFB800] transition-colors text-base font-bold ${spaceMono.className}`}>
              Docs
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex flex-col p-4 mb-16">
        <div className="w-full bg-gradient-to-r from-[#1A1A40] via-[#2A2A5D] to-[#3A3A7A] py-8 mb-8 text-shadow-sm relative overflow-hidden">
  {/* Add waves background */}
  <div className="absolute inset-0 w-full h-full">
    <img 
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Collab.Land%20Re-Brand%20Banners%20(1000%20x%20250%20px))%20(4)-Abz6jP3Ua2VjlX8FSp9ex0x86UqRLA.png"
      alt="Wave pattern background"
      className="w-full h-full object-cover"
    />
  </div>
  {/* Add static bot face */}
  <div className="absolute right-0 top-0 bottom-0 w-auto h-full">
    <img 
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Collab.Land%20Re-Brand%20Banners%20(1000%20x%20250%20px))%20(3)-gJX4NcnIWXIUlS6rMOqfsAmUHpxNQb.png"
      alt="Collab.Land robot mascot"
      className="h-full w-auto object-contain"
    />
  </div>
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <h2 className="text-3xl font-bold text-[#F5F1E6] text-center text-shadow-sm">
      Your Collab.Land Member Portal
    </h2>
    <p className={`mt-4 text-xl text-[#B8B9BE] text-center text-shadow-sm ${spaceMono.className}`}>
      Connect. Customize. Control your Experience.
    </p>
  </div>
</div>
        <div className="relative">
          <div className="mb-8">
            <FeaturedCommunities />
          </div>
          
          <div className="max-w-7xl mx-auto px-12">
            <Card className="bg-[#242457] shadow-lg border-none rounded-lg overflow-hidden backdrop-blur-md backdrop-filter border-2 border-[#4A4A7E] box-shadow-[0_0_15px_rgba(74,74,126,0.5)]">
              <CardHeader className="bg-[#2A2A5D] border-b border-[#5A5A8E]">
                <CardTitle className="text-2xl font-bold text-[#F5F1E6]">Wallet Management</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {wallets.length > 0 ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4 text-[#F5F1E6]">Connected Wallets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <AnimatePresence>
                        {wallets.map((wallet, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card  
                              className="bg-[#282862] cursor-pointer transform transition-all duration-300 hover:scale-105 border border-[#5A5A8E] shadow-[0_0_10px_rgba(74,74,126,0.3)]"
                              onClick={() => toggleWalletExpansion(index)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center mb-2">
                                  <span className="text-2xl mr-2">{getWalletIcon(wallet.type)}</span>
                                  <span className="font-semibold text-[#F5F1E6]">{wallet.type}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-[#F5F1E6] opacity-80 truncate mr-2">{wallet.address}</div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      copyToClipboard(wallet.address, index)
                                    }}
                                    className="text-[#F5F1E6] hover:text-[#FFC700] transition-colors"
                                    aria-label="Copy wallet address"
                                  >
                                    {copiedWallet === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  </button>
                                </div>
                                {expandedWallet === index && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4"
                                  >
                                    <Button 
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        disconnectWallet(index)
                                      }}
                                      variant="destructive"
                                      className="bg-red-600 hover:bg-red-700 text-[#F5F1E6] w-full border border-red-400 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.7)]"
                                    >
                                      Disconnect
                                    </Button>
                                  </motion.div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="flex justify-between">
                      <Button 
                        onClick={() => setIsWalletModalOpen(true)}
                        className="w-full bg-[#FFC700] hover:bg-[#FFD700] text-[#1A1A40] border border-[#FFD700] shadow-[0_0_10px_rgba(255,199,0,0.5)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,199,0,0.7)]"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="mr-2 h-4 w-4" />
                        )}
                        Add a New Wallet
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="mb-4 text-[#F5F1E6]">No wallets connected</p>
                    <Button 
                      onClick={() => setIsWalletModalOpen(true)}
                      className="bg-[#FFC700] hover:bg-[#FFD700] text-[#1A1A40] border border-[#FFD700] shadow-[0_0_10px_rgba(255,199,0,0.5)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,199,0,0.7)]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      Add a New Wallet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="w-full flex justify-center mt-8">
              <Button 
                className="bg-[#3A7D7B] hover:bg-[#3A7D7B]/90 text-[#F5F1E6] border border-[#4A8D8B] shadow-[0_0_10px_rgba(58,125,123,0.5)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(58,125,123,0.7)] px-8 py-3 text-lg"
                onClick={verifyWallets}
                disabled={isVerifying}
                aria-label="Check Access Eligibility"
              >
                {isVerifying ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-5 w-5" />
                )}
                Check Access Eligibility
              </Button>
            </div>
          </div>
        </div>
      </main>
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
          <div className="text-sm font-bold">©Collab.Land 2024</div>
        </div>
      </footer>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={addNewWallet}
        setSelectedWallet={setSelectedWallet}
      />
      <AdPopup
        isOpen={isAdPopupOpen}
        onClose={() => {
          setIsAdPopupOpen(false)
          setIsWalletAdded(false)
          setIsLoading(false)
          setIsVerifying(false)
        }}
        onContinue={() => {
          if (isWalletAdded) {
            const newWallet = { type: selectedWallet, address: generateRandomAddress('EVM') }
            setWallets(prevWallets => [...prevWallets, newWallet])
          } else {
            setIsRolesModalOpen(true)
          }
          setIsAdPopupOpen(false)
          setIsWalletAdded(false)
          setIsLoading(false)
          setIsVerifying(false)
        }}
        isWalletAdded={isWalletAdded}
      />
      <RolesGrantedModal
        isOpen={isRolesModalOpen}
        onClose={() => setIsRolesModalOpen(false)}
        roles={grantedRoles}
      />
    </div>
  )
}