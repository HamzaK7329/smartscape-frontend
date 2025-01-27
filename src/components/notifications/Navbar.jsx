import React, { useState } from "react"
import Image from "next/image"
import {
  MdPerson,
  MdSecurity,
  MdSettings,
  MdNotifications,
  MdDevices,
  MdArrowBackIosNew,
} from "react-icons/md"
import styles from "./Navbar.module.css"

const NavItem = ({ name, icon: Icon, activeNavItem, onClick, className }) => (
  <li
    className={`${styles.navItem} ${activeNavItem === name ? styles.activeNavItem : ""} ${className || ""}`}
    onClick={() => onClick(name)}
  >
    {Icon && <Icon className={styles.icon} />}
    <span className={styles.navText}>{name}</span>
  </li>
)

export default function Navbar() {
  const [activeNavItem, setActiveNavItem] = useState("Profiles")

  const navItems = [
    { name: "Profiles", icon: MdPerson },
    { name: "Privacy & Security", icon: MdSecurity },
    { name: "Admin Settings", icon: MdSettings },
    { name: "Notifications", icon: MdNotifications },
    { name: "Rooms & Devices", icon: MdDevices },
  ]

  const handleNavItemClick = (item) => setActiveNavItem(item)

  const handleBackClick = () => {
    console.log("Back button clicked")
    // Add your back button functionality here
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navHeader}>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.smartScapeLogo}
            src="/logo-small.svg"
            alt="smartscape logo"
            width={82}
            height={67}
            priority
          />
          <button className={styles.backButton} onClick={handleBackClick} aria-label="Go back">
            <MdArrowBackIosNew />
          </button>
        </div>
      </div>
      <ul className={styles.navList}>
        {navItems.map(({ name, icon }) => (
          <NavItem key={name} name={name} icon={icon} activeNavItem={activeNavItem} onClick={handleNavItemClick} />
        ))}
      </ul>
    </nav>
  )
}