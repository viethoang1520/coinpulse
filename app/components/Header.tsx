'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathName = usePathname()
  return (
    <header>
      <div className="main-container inner">
        <Link href='/' className={cn('nav-link', {
          'is-active': pathName === '/',
          'is-home': true
        })}>
          <Image src='logo.svg' alt='logo' width={132} height={40} />
        </Link>
        <nav>
          <Link href='/' className={cn('nav-link', {
            'is-active': pathName === '/coins',
          })}>Home</Link>
          <p>Search modal</p>
          <Link href='/coins'>All Coins</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header