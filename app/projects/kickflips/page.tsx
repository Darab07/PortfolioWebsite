"use client"

import { useEffect, useRef, useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Script from "next/script"

export default function StonexisProject() {
  const contentCardRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/mdarabkhan02/new-meeting'});
    } else {
      // Fallback: open in new tab
      window.open('https://calendly.com/mdarabkhan02/new-meeting', '_blank');
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    window.scrollTo(0, 0)

    // Custom scroll handler for parallax - disabled on mobile
    const handleScroll = () => {
      // Only apply parallax on desktop (screen width > 768px)
      if (window.innerWidth > 768 && contentCardRef.current) {
        const scrollY = window.scrollY
        const maxScroll = window.innerHeight * 0.2
        const progress = Math.min(scrollY / maxScroll, 1)
        const translateY = (1 - progress) * 100
        contentCardRef.current.style.transform = `translateY(${translateY}%)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    // Fade-up animation for heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Add fade-up animations to other elements
    gsap.utils.toArray('.fade-up').forEach((element: any) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen">
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .fade-up {
          opacity: 0;
        }
        
        /* Mobile-specific styles to prevent image zoom */
        @media (max-width: 768px) {
          .hero-bg {
            background-attachment: scroll !important;
            background-size: cover !important;
            background-position: center !important;
            transform: none !important;
          }
          .content-card {
            transform: none !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }
        
        /* Force desktop text size for description */
        @media (min-width: 768px) {
          .description-text {
            font-size: 1.5rem !important;
          }
        }
        
        /* Force font sizes for specific elements */
        .force-text-sm {
          font-size: 0.875rem !important;
        }
        
        .force-text-lg {
          font-size: 1.125rem !important;
        }
        
        .force-text-2xl {
          font-size: 1.5rem !important;
        }
        
        .force-text-4xl {
          font-size: 2.25rem !important;
        }
        
        .force-text-6xl {
          font-size: 3.75rem !important;
        }
      `}</style>

      <div
        className="hero-bg fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed md:bg-fixed bg-scroll"
        style={{
          backgroundImage: "url('/images/kickflips/Laptop Mockup.png')",
        }}
      />

      <Header />

      <div className="h-screen"></div>

      <div ref={contentCardRef} className="content-card relative z-20 bg-white min-h-screen py-16 md:py-24 text-xl md:text-2xl">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="pl-6 md:pl-12">
            <h1 ref={headingRef} className="text-4xl lg:text-6xl font-light text-black mb-1">
              KickFlips
            </h1>
          </div>

          <div className="space-y-4 px-6 md:px-12 pb-2 md:pb-0">
            <p className="text-sm md:text-2xl text-gray-600 leading-relaxed text-left">
            I designed a modern, responsive website concept for KickFlips, a sneaker brand built for the next generation of streetwear culture.
            The project focused on creating a bold digital presence with an intuitive user experience, strong visual hierarchy, and a brand identity that feels fresh and authentic.
            The design emphasizes responsive layouts, product-first storytelling, and interactive elements that highlight the energy of sneaker culture while reinforcing KickFlips’ position as a rising lifestyle brand.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black rounded-full animate-blink"></div>
              <a href="https://www.figma.com/design/u5o045axAMKljZKsoyrM4e/KickFlips?node-id=0-1&t=q5p1xdspupaZrd5e-1" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors">
                View wireframes
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only image section */}
      <div className="relative z-20 bg-white md:hidden -mt-50">
        <div className="p-4 mx-4" style={{ backgroundColor: "#9a8578" }}>
          <div className="w-full">
            <img
              src="/images/kickflips/Catalog Page.png"
              alt="KickFlips catalog page showing products"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="relative z-20 -mt-4 pt-0 md:pt-20 pb-24 px-6 md:px-12 mx-4 md:mx-8 hidden md:block" style={{ backgroundColor: "#9a8578" }}>
          <div className="max-w-7xl mx-auto">
            <div className="w-full">
              <img
                src="/images/kickflips/Catalog Page.png"
                alt="KickFlips product page showing products"
                className="w-full h-auto rounded-lg shadow-lg scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 min-h-screen">
            <div className="lg:sticky lg:top-8 lg:h-fit pt-8 md:pt-32 pb-8 md:pb-16 pl-6 md:pl-6">
              <h2 className="font-light text-black mb-8 leading-relaxed text-sm md:text-2xl">
                <span className="md:hidden">The website was designed with a bold and intuitive layout that lets visitors easily browse sneakers, explore upcoming releases, and experience the brand’s energy in a seamless way.</span>
                <span className="hidden md:block">
                The website was designed with a bold and intuitive layout that lets visitors easily browse sneakers, explore upcoming releases, and experience the brand’s energy in a seamless way.
                </span>
              </h2>
            </div>

            <div className="pt-8 md:pt-24 pb-8 md:pb-16 -ml-2 md:-ml-8">
              <img
                src="/images/kickflips/Product Page.png"
                alt="KickFlips product page showing products"
                className="w-full h-auto rounded-lg shadow-lg hidden md:block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Landing Page image */}
      <div className="relative z-20 bg-white md:hidden -mt-130">
        <div className="p-4 mx-4" style={{ backgroundColor: "#6b7280" }}>
          <div className="w-full">
            <img
              src="/images/kickflips/Product Page.png"
              alt="KickFlips product page showing products"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="w-full px-6 md:px-12 py-12 md:py-24 text-xl md:text-2xl">
          <div className="max-w-2xl pl-0 md:pl-12 fade-up">
            <h3 className="text-lg md:text-2xl font-light text-gray-400 mb-2 tracking-wider uppercase border-b border-gray-200 pb-6 w-full">
              SERVICES
            </h3>

            <div className="space-y-2">
              <div className="border-b border-gray-200 py-3 w-full">
                <h4 className="font-light text-black text-lg md:text-2xl m-0">Website Strategy, Consulting</h4>
              </div>

              <div className="border-b border-gray-200 py-3 w-full">
                <h4 className="font-light text-black text-lg md:text-2xl m-0">UX/UI, Web Design</h4>
              </div>

              <div className="border-b border-gray-200 py-3 w-full">
                <h4 className="font-light text-black text-lg md:text-2xl m-0">Brand Identity</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="relative z-20 py-8 md:py-16 px-6 md:px-12 mx-4 md:mx-8" style={{ backgroundColor: "#9a8578" }}>
          <div className="max-w-7xl mx-auto">
            <div className="w-full">
              <img
                src="/images/kickflips/Mobile Layout.png"
                alt="KickFlips mobile layout showing products"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="px-6 md:px-12 py-12 md:py-24 text-xl md:text-5xl">
          <div className="w-full fade-up">
            <h2 className="text-lg md:text-5xl lg:text-7xl font-light text-black leading-tight text-left">
              <span className="md:hidden">The project was crafted to elevate KickFlips’ digital identity and build a strong presence in sneaker culture. It delivers an immersive, engaging experience for visitors, reinforcing the brand’s position as a bold lifestyle leader.</span>
              <span className="hidden md:block">
              The project was crafted to elevate KickFlips’ digital
                <br />
                identity and build a strong presence in sneaker culture.
                <br />
                It delivers an immersive, engaging experience for visitors,
                <br />
                reinforcing the brand’s position as a bold lifestyle leader.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="px-6 md:px-12 py-12 md:py-24">
          {/* Mobile: Stack images vertically */}
          <div className="block md:hidden space-y-8">
            <div className="w-full p-4" style={{ backgroundColor: "#6b7280" }}>
              <img
                src="/images/kickflips/Store Page.png"
                alt="Complete Stonexis website showing innovative facade systems, market recognition, team section, and project portfolio"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full p-4" style={{ backgroundColor: "#6b7280" }}>
              <img
                src="/images/kickflips/Manufacturing Page.png"
                alt="Stonexis 2in1 facade system page showing product specifications, texture selection, and technical details"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Desktop: Side by side grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <div className="w-full p-8" style={{ backgroundColor: "#6b7280" }}>
              <img
                src="/images/kickflips/Store Page.png"
                alt="Complete Stonexis website showing innovative facade systems, market recognition, team section, and project portfolio"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full p-8" style={{ backgroundColor: "#6b7280" }}>
              <img
                src="/images/kickflips/Manufacturing Page.png"
                alt="Stonexis 2in1 facade system page showing product specifications, texture selection, and technical details"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="px-6 md:px-12 py-12 md:py-24">
          <div className="w-full">
            <h2 className="text-xl lg:text-6xl font-light text-black leading-tight text-left">
              <span className="lg:hidden">The platform enables visitors to seamlessly browse sneaker collections, discover limited-edition drops, and customize their choices—while reinforcing KickFlips’ reputation for creativity and innovation in streetwear culture.</span>
              <span className="hidden lg:block">
              The platform enables visitors to seamlessly browse
                <br />
                sneaker collections and limited-edition drops.
                <br />
                It offers smooth customization options
                <br />
                while reinforcing KickFlips’ reputation for innovation.
              </span>
            </h2>
          </div>
        </div>
      </div>


      <div className="relative z-20 bg-white">
        <div className="py-2 md:py-24 px-2 md:px-12">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="w-full p-1 md:p-12 h-96 md:h-auto" style={{ backgroundColor: "#6b7280" }}>
                <img
                  src="/images/kickflips/Menu Page.png"
                  alt="KickFlips menu page showing products"
                  className="w-full h-full md:h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full p-1 md:p-12 h-96 md:h-auto" style={{ backgroundColor: "#6b7280" }}>
                <img
                  src="/images/kickflips/Our Story Page.png"
                  alt="KickFlips our story page showing products"
                  className="w-full h-full md:h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full p-1 md:p-12 h-96 md:h-auto" style={{ backgroundColor: "#6b7280" }}>
                <img
                  src="/images/kickflips/Filter Page.png"
                  alt="KickFlips filter page showing products"
                  className="w-full h-full md:h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full p-1 md:p-12 h-96 md:h-auto" style={{ backgroundColor: "#6b7280" }}>
                <img
                  src="/images/kickflips/Details & Care Section.png"
                  alt="KickFlips details & care section showing products"
                  className="w-full h-full md:h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="px-6 md:px-12 py-12 md:py-24">
          <div className="w-full">
            <h2 className="text-xl lg:text-6xl font-light text-black leading-tight text-left">
              <span className="lg:hidden">The visual identity was designed to strengthen KickFlips’ presence by showcasing bold sneaker card mockups. It highlights the brand’s energy and authenticity, leaving a memorable impression on visitors and reinforcing KickFlips’ position in the sneaker culture space.</span>
              <span className="hidden lg:block">
              The visual identity was crafted
                <br />
                to amplify KickFlips’ digital presence
                <br />
                through bold and modern card mockups.
                <br />
                It captures the brand’s energy and authenticity,
                <br />
                leaving a lasting impression on visitors.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="py-24 px-12">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 rounded-lg overflow-hidden">
                <img
                  src="/images/kickflips/Phone Mockup.png"
                  alt="Stonexis mobile mockup showing responsive design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-96 rounded-lg overflow-hidden">
                <img
                  src="/images/kickflips/Card Mockup.png"
                  alt="Stonexis cards showing project portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-16 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 fade-up">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
              <div className="pl-8 py-8">
                <h3 className="font-light text-black mb-4 text-xl md:text-2xl">Discovery</h3>
                <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8">4 days</p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  I researched sneaker culture, competitor brands, and audience expectations to understand trends and user 
                  behavior. From these insights, I identified opportunities to create a bold, engaging experience and 
                  sketched early concepts for layouts and interactions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
              <div className="pl-8 py-8">
                <h3 className="font-light text-black mb-4 text-xl md:text-2xl">Design</h3>
                <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8">9 days</p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  I created high-fidelity wireframes and responsive layouts in Figma, focusing on product-first storytelling 
                  and a clean hierarchy. A component-based design system ensured consistency across pages, from product 
                  displays to limited drop announcements.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
              <div className="pl-8 py-8">
                <h3 className="font-light text-black mb-4 text-xl md:text-2xl">Branding & Visual Identity</h3>
                <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8">6 days</p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  I developed supporting brand assets, including sneaker card mockups and bold visual identity elements. 
                  By refining typography, color palette, and iconography, I built a design language that reflects 
                  KickFlips' authenticity and energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white">
        <div className="py-24 px-12">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[600px] md:h-[800px] rounded-lg overflow-hidden">
                <img
                  src="/images/kickflips/Type Pairing.png"
                  alt="KickFlips typography and design pairing showcase"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-[600px] md:h-[800px] rounded-lg overflow-hidden">
                <img
                  src="/images/stonexis/Color.gif"
                  alt="KickFlips animated design demonstration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative z-10 w-full py-32" style={{ backgroundColor: "#F6F6F6" }}>
        <div className="w-full px-6 md:px-12">
          {/* Full-width heading and divider */}
          <div className="max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-light leading-tight tracking-[-0.075em] text-black">
                <span className="block md:hidden">
                  Take the next step
                  <br />
                  with me
                </span>
                <span className="hidden md:block">
                  Take the next
                  <br />
                  step with me
                </span>
              </h2>
          </div>
          <div className="space-y-6 mt-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    CONNECT FOR COLLABORATION
                  </h3>
                </div>
                <div className="w-full h-px bg-gray-300"></div>
              </div>

          {/* Two cards in the same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch mt-12">
            <div className="bg-white rounded-lg p-8 shadow-sm h-full min-h-[200px]">
              <p className="text-black text-lg leading-relaxed mb-[60px]">
                  Book a time for a short call to discuss the possibilities of working together.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src="/professional-headshot-of-vilius-vaicius.png"
                        alt="Vilius Vaicius"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">M. Darab Khan</h4>
                    </div>
                  </div>

                  <a 
                    href="https://calendly.com/mdarabkhan02/new-meeting"
                    onClick={(e) => {
                      e.preventDefault();
                      openCalendly();
                    }}
                    className="bg-white hover:bg-gray-50 text-black px-6 py-2 rounded-full text-base font-medium border border-gray-200 shadow-sm inline-block cursor-pointer w-full md:w-auto text-center"
                  >
                    Book a meeting
                  </a>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm h-full min-h-[200px]">
                <p className="text-lg leading-relaxed text-gray-500 mb-[60px]">Contact</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">M. Darab Khan</h4>
                      <p className="text-gray-500 text-sm">mdarabkhan02@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
