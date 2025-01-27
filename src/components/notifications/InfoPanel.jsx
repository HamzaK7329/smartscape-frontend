import React, { useState, useEffect } from "react"
import { MdShield, MdLock, MdRemoveRedEye } from "react-icons/md"
import styles from "./InfoPanel.module.css"

export default function InfoPanel() {
  const [isMobile, setIsMobile] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    section1: false,
    section2: false,
    section3: false,
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setExpandedSections({
        section1: true,
        section2: true,
        section3: true,
      })
    } else {
      setExpandedSections({
        section1: false,
        section2: false,
        section3: false,
      })
    }
  }, [isMobile])

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <aside className={styles.infoPanel}>
      <div className={styles.card}>
        {/* Section 1 */}
        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={() => toggleSection("section1")}>
            <MdShield size={58} color="#9BBEC7" />
            <h2>Why isn't my info shown here?</h2>
          </button>
          <p className={`${styles.paragraph} ${expandedSections.section1 ? styles.expanded : ""}`}>
            We're hiding some account details to protect your identity.
          </p>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={() => toggleSection("section2")}>
            <MdLock size={58} color="#E2C391" />
            <h2>Which details can be edited?</h2>
          </button>
          <p className={`${styles.paragraph} ${expandedSections.section2 ? styles.expanded : ""}`}>
            Identity verification details can't be changed. You can edit contact info and personal details but may need
            to verify your identity again.
          </p>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={() => toggleSection("section3")}>
            <MdRemoveRedEye size={58} color="#A8B7AB" />
            <h2>What info is shared with others?</h2>
          </button>
          <p className={`${styles.paragraph} ${expandedSections.section3 ? styles.expanded : ""}`}>
            Your usage of SmartScape, feedback, and savings percentage may be shared with others.
          </p>
        </div>
      </div>
    </aside>
  )
}