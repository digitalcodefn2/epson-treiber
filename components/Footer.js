import Link from "next/link"
import React from "react"

function Footer() {
  return (
    <footer className="bg-primary-900 text-white text-center py-10">
      <div className="container">
        <div className="mb-8 xl:mb-4">
          <ul className="flex flex-col xl:flex-row items-center justify-center gap-2 xl:gap-6">
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Terms and Conditions</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Sitemap</Link>
            </li>
          </ul>
        </div>
        <div>© Copyright 2023 - 2023 Driversidn.com. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
