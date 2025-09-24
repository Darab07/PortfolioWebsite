"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function About() {
  const aboutSectionRef = useRef<HTMLHeadingElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  
  // Initialize answerRefs array
  useEffect(() => {
    answerRefs.current = new Array(faqData.length).fill(null)
  }, [])
  
  // Mobile carousel state
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const foundationCards = [
    {
      number: "01.",
      title: "Brief us",
      description: "Provide your project details for us to better align our web design, development, and brand identity design services with your needs.",
      hasButton: true
    },
    {
      number: "02.",
      title: "Meet us online",
      description: "Share your project information so we can accurately adjust our web design and development services to suit your requirements.",
      hasButton: false
    },
    {
      number: "03.",
      title: "Free estimation",
      description: "Receive a detailed estimate from us, designed to provide a clear overview of the costs tailored to your project's unique requirements.",
      hasButton: false
    },
    {
      number: "04.",
      title: "Work together",
      description: "Collaborate closely with us to efficiently and effectively turn your project vision into reality, ensuring comprehensive success.",
      hasButton: false
    }
  ]

  const nextCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % foundationCards.length)
      setTimeout(() => setIsAnimating(false), 100)
    }, 150)
  }

  const prevCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + foundationCards.length) % foundationCards.length)
      setTimeout(() => setIsAnimating(false), 100)
    }, 150)
  }

  const goToCard = (index: number) => {
    if (isAnimating || index === currentCardIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex(index)
      setTimeout(() => setIsAnimating(false), 100)
    }, 150)
  }

  const faqData = [
    {
      question: "What do you require before starting a project?",
      answer: "I usually require a clear project brief and a starting deposit before beginning work. This ensures both alignment and commitment from the very start."
    },
    {
      question: "What is included in a round of revision?",
      answer: "Each project typically includes up to 3 rounds of revisions per phase. Extra revisions can be added if needed, though they may take additional time and cost."
    },
    {
      question: "What is the price?",
      answer: "Pricing depends on the scope and complexity of your project. Since no two projects are alike, I'll provide a tailored quote after understanding your requirements. I'm flexible with payment terms and can adjust to fit different budgets."
    },
    {
      question: "How long will it take to complete the project?",
      answer: "Timelines vary by project, but most take between 4–9 weeks. If you have a deadline in mind, let me know — I'll do my best to accommodate."
    },
    {
      question: "Can we edit the website when it's done?",
      answer: "Yes! I design websites that are easy to manage. With platforms like Webflow or WordPress, you'll be able to edit content yourself without needing to code."
    },
    {
      question: "Do you design and build websites?",
      answer: "Yes, I handle both design and development. From UI/UX design and wireframes to full builds, I make sure your site is responsive, optimized for SEO, and user-friendly. I also create no-code solutions in Webflow when needed."
    },
    {
      question: "What is the process?",
      answer: "My process starts with discovery and research to fully understand your brand and users. From there, I create moodboards and wireframes, then move into design and implementation — always keeping you involved along the way."
    },
    {
      question: "What exactly do you do?",
      answer: "I design digital identities and create websites. My work ranges from branding and UI/UX design to interactive, responsive web experiences tailored to your goals."
    },
    {
      question: "I'm interested in collaboration. Where do I start?",
      answer: "Great! Just reach out with a short overview of your project through my contact page or email me directly at mdarabkhan02@gmail.com. I'll get back to you quickly to discuss details and next steps."
    }
  ]

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/mdarabkhan02/new-meeting'});
    } else {
      // Fallback: open in new tab
      window.open('https://calendly.com/mdarabkhan02/new-meeting', '_blank');
    }
  }

  const handleFAQClick = (index: number) => {
    if (openFAQ === index) {
      // Close the current FAQ
      setOpenFAQ(null)
    } else {
      // Open the new FAQ
      setOpenFAQ(index)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    if (aboutSectionRef.current) {
      gsap.fromTo(
        aboutSectionRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <Header />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="px-6 md:px-12 py-16 md:py-32 bg-white">
          <div ref={heroRef} className="max-w-4xl">
            <h1
              ref={headlineRef}
              className="text-4xl md:text-6xl font-light leading-tight text-black mb-12 tracking-[-0.075em]"
            >
              <span className="block md:hidden">
                Designing digital
                <br />
                experiences that set
                <br />
                businesses apart.
              </span>
              <span className="hidden md:block">
                <span className="inline-block">Designing</span> <span className="inline-block">digital</span>{" "}
                <span className="inline-block">experiences</span> <span className="inline-block">that</span>{" "}
                <span className="inline-block">{""}</span>
                <br />
                <span className="inline-block">set</span> <span className="inline-block">businesses</span>{" "}
                <span className="inline-block">apart.</span>
              </span>
            </h1>
          </div>
        </section>

        {/* Main About Section with Sticky Layout */}
        <section className="relative z-10 w-full bg-white py-8 md:py-16 pb-45">
          <div className="w-full px-6 md:px-12">
            {/* Mobile Layout: Image → Text */}
            <div className="block md:hidden space-y-4">
              {/* Mobile Image */}
              <div className="flex justify-center">
                <div className="w-1/2 aspect-[9/16] overflow-hidden">
                  <img
                    src="/images/Profile.jpg"
                    alt="Mohammad Darab Khan - Portfolio Designer and Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Mobile Text */}
              <div className="space-y-8">
                <p className="text-black text-lg leading-relaxed">
                  Hi, I'm Mohammad Darab — a passionate UI/UX designer who believes great design can transform businesses and build meaningful connections.
                </p>

                <p className="text-lg leading-relaxed text-gray-500">
                  My journey began with a simple belief: every brand deserves a digital presence that reflects its values and aspirations. I combine strategic thinking with creative execution to craft designs that are not only visually engaging but also impactful.
                </p>

                <p className="text-lg leading-relaxed text-gray-500">
                  From creating visual identities to designing interactive web experiences, I approach every project with dedication, attention to detail, and a collaborative mindset. I love turning ideas into purposeful, intuitive, and engaging designs.
                </p>

                <p className="text-lg leading-relaxed text-gray-500">
                  For me, design isn't just about aesthetics — it's about creating experiences that resonate with people, solve real problems, and drive growth. Every pixel and every interaction is intentional, because the details are what make the difference.
                </p>

                <div className="mt-16">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">MY APPROACH</h3>
                  <div className="grid grid-cols-2 gap-8 leading-5 py-0">
                    <div className="space-y-4">
                      <p className="text-black text-lg leading-4">Strategic thinking</p>
                      <p className="text-black text-lg leading-4">User-centered design</p>
                      <p className="text-black text-lg leading-4">Brand storytelling</p>
                      <p className="text-black text-lg leading-4">Technical excellence</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-black text-lg leading-4">Collaborative process</p>
                      <p className="text-black text-lg leading-4">Attention to detail</p>
                      <p className="text-black text-lg leading-4">Continuous innovation</p>
                      <p className="text-black text-lg leading-4">Results-driven solutions</p>
                    </div>
                  </div>
                  
                  </div>
              </div>
            </div>
            
            {/* Desktop Layout: Image + Text Side by Side */}
            <div className="hidden md:grid grid-cols-2 gap-16 items-start">
              {/* Left side - Profile Image (Sticky) */}
              <div className="sticky top-32 self-start flex justify-center">
                <div className="w-1/2 aspect-[9/16] overflow-hidden">
                  <img
                    src="/images/Profile.jpg"
                    alt="Mohammad Darab Khan - Portfolio Designer and Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right side - Description paragraphs (Scrolling) */}
              <div className="space-y-8 mt-24">
                <p className="text-black text-lg leading-relaxed">
                  Hi, I'm Mohammad Darab — a passionate UI/UX designer who believes great design can transform businesses and build meaningful connections.
                </p>

                <p className="text-lg leading-relaxed text-gray-500">
                  My journey began with a simple belief: every brand deserves a digital presence that reflects its values and aspirations. I combine strategic thinking with creative execution to craft designs that are not only visually engaging but also impactful.
                </p>

                <p className="text-lg leading-relaxed text-gray-500">
                  From creating visual identities to designing interactive web experiences, I approach every project with dedication, attention to detail, and a collaborative mindset. I love turning ideas into purposeful, intuitive, and engaging designs.
                </p>

                <p className="text-lg leading-relaxed text-gray-500">
                  For me, design isn't just about aesthetics — it's about creating experiences that resonate with people, solve real problems, and drive growth. Every pixel and every interaction is intentional, because the details are what make the difference.
                </p>

                <div className="mt-16">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">MY APPROACH</h3>
                  <div className="grid grid-cols-2 gap-8 leading-5 py-0">
                    <div className="space-y-4">
                      <p className="text-black text-lg leading-4">Strategic thinking</p>
                      <p className="text-black text-lg leading-4">User-centered design</p>
                      <p className="text-black text-lg leading-4">Brand storytelling</p>
                      <p className="text-black text-lg leading-4">Technical excellence</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-black text-lg leading-4">Collaborative process</p>
                      <p className="text-black text-lg leading-4">Attention to detail</p>
                      <p className="text-black text-lg leading-4">Continuous innovation</p>
                      <p className="text-black text-lg leading-4">Results-driven solutions</p>
                    </div>
                  </div>
                  
                </div>

                <div className="mt-16">
                  <p className="text-lg leading-relaxed text-gray-500">
                    Whether you're a startup building your brand identity or an established company refreshing your digital presence, I help you tell your story in a way that captivates and converts.
                  </p>
                </div>

                <div className="mt-16">
                  <p className="text-lg leading-relaxed text-gray-500">
                    My work spans across industries and audiences, but my commitment is always the same: to create designs that make a difference. For me, success isn't measured only by the beauty of the design, but by the real impact it creates — for businesses and for the people who use their products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative z-10 w-full bg-black py-16 md:py-32">
          <div className="w-full px-6 md:px-12">
            {/* Mobile Layout */}
            <div className="block md:hidden">
              <h2 className="text-4xl font-light leading-tight text-white tracking-[-0.075em]">
                Focused on transforming digital experiences with custom web solutions that elevate brands and secure their future.
                <br />
                <span className="text-gray-400">I prioritize timeless design and empowering technology to create digital products that connect, inspire, and deliver real impact.</span>
              </h2>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:block">
              <h2 className="text-6xl font-light leading-tight tracking-[-0.075em] text-white">
                Focused on transforming digital experiences with custom web solutions that elevate brands and secure their future.
                <br />
                <span className="text-gray-400">I prioritize timeless design and empowering technology to create digital products that connect, inspire, and deliver real impact.</span>
              </h2>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="relative z-10 w-full bg-black py-16 md:py-32 text-white">
          <div className="w-full px-6 md:px-12">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-16">Why Choose Me</h3>
            
            {/* Mobile Layout */}
            <div className="block md:hidden space-y-8">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Agile & Personalized</h4>
                <p className="text-lg leading-relaxed text-gray-300">
                  I adapt my design process to fit each project, ensuring every solution feels tailored to your brand and your users. My focus is on creating designs that align seamlessly with your goals while staying flexible for growth.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Strategic Design Thinking</h4>
                <p className="text-lg leading-relaxed text-gray-300">
                  I approach every project with both creativity and strategy, combining user-centered design with a clear understanding of business objectives. This allows me to craft experiences that are not only visually engaging but also purposeful.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Delivering Real Value</h4>
                <p className="text-lg leading-relaxed text-gray-300">
                  For me, design is more than aesthetics — it's about impact. I create digital products that balance beauty with usability, helping brands stand out while delivering lasting results for both businesses and their users.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Reliable Client Support</h4>
                <p className="text-lg leading-relaxed text-gray-300">
                  I value collaboration and clear communication at every stage of a project. By staying responsive and transparent, I ensure a smooth design process and a supportive experience from start to finish.
                </p>
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:block space-y-12">
              <div className="border-t border-gray-700 pt-12">
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-light text-gray-400">(01)</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-3xl font-medium mb-4">Agile & Personalized</h4>
                    <p className="text-xl leading-relaxed text-gray-300">
                      I adapt my design process to fit each project, ensuring every solution feels tailored to your brand and your users. My focus is on creating designs that align seamlessly with your goals while staying flexible for growth.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-12">
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-light text-gray-400">(02)</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-3xl font-medium mb-4">Strategic Design Thinking</h4>
                    <p className="text-xl leading-relaxed text-gray-300">
                      I approach every project with both creativity and strategy, combining user-centered design with a clear understanding of business objectives. This allows me to craft experiences that are not only visually engaging but also purposeful.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-12">
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-light text-gray-400">(03)</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-3xl font-medium mb-4">Delivering Real Value</h4>
                    <p className="text-xl leading-relaxed text-gray-300">
                      For me, design is more than aesthetics — it's about impact. I create digital products that balance beauty with usability, helping brands stand out while delivering lasting results for both businesses and their users.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-12">
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-light text-gray-400">(04)</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-3xl font-medium mb-4">Reliable Client Support</h4>
                    <p className="text-xl leading-relaxed text-gray-300">
                      I value collaboration and clear communication at every stage of a project. By staying responsive and transparent, I ensure a smooth design process and a supportive experience from start to finish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="relative z-10 w-full bg-white py-16 md:py-32">
          <div className="w-full px-6 md:px-12">
            {/* Mobile Layout */}
            <div className="block md:hidden space-y-8">
              <h3 className="text-4xl font-light text-black mb-6">FAQs:</h3>
              <p className="text-4xl text-gray-500 mb-8">Common design questions</p>
              
              <div className="space-y-0 mt-16">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-t border-gray-200 py-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => handleFAQClick(index)}
                    >
                      <span className="text-lg text-black">{faq.question}</span>
                      <span className="text-2xl text-black">
                        {openFAQ === index ? '×' : '+'}
                      </span>
                    </div>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="mt-6 pt-4">
                        <p className="text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left side - Title (Sticky) */}
              <div className="sticky top-32 self-start">
                <h3 className="text-8xl font-light text-black mb-6">FAQs:</h3>
                <p className="text-8xl text-gray-500">Common design questions</p>
              </div>

              {/* Right side - Questions */}
              <div className="space-y-0 mt-16">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-t border-gray-200 py-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => handleFAQClick(index)}
                    >
                      <span className="text-2xl text-black">{faq.question}</span>
                      <span className="text-3xl text-black">
                        {openFAQ === index ? '×' : '+'}
                      </span>
                    </div>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="mt-6 pt-4">
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Setting the foundation for project success section */}
        <section className="relative z-10 w-full bg-white pb-20 max-w-full overflow-x-hidden">
          <div className="w-full px-6 md:px-12">
            <h2 className="font-light leading-tight tracking-[-0.075em] text-black mb-16 text-4xl md:text-7xl">
              <span className="block md:hidden">
                Setting the
                <br />
                Foundation for your
                <br />
                project success
              </span>
              <span className="hidden md:block">
                Setting the foundation for
                <br />
                your project success.
              </span>
            </h2>

            {/* Mobile Carousel - Hidden on desktop */}
            <div className="md:hidden mt-12">
              <div className="relative overflow-hidden">
                {/* Card Container with Animation */}
                <div className="relative">
                  <div 
                    className={`transition-all duration-300 ease-in-out transform ${
                      isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="border-l-2 border-black pl-6 mb-8">
                      <div className="text-gray-400 text-sm font-medium mb-4">
                        {foundationCards[currentCardIndex].number}
                      </div>
                      <h3 className="text-xl font-bold text-black mb-4">
                        {foundationCards[currentCardIndex].title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {foundationCards[currentCardIndex].description}
                      </p>
                      {foundationCards[currentCardIndex].hasButton && (
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={prevCard}
                    disabled={isAnimating}
                    className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dot Indicators */}
                  <div className="flex space-x-2">
                    {foundationCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToCard(index)}
                        disabled={isAnimating}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentCardIndex 
                            ? 'bg-black' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextCard}
                    disabled={isAnimating}
                    className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Grid - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-4 gap-8 mt-20">
              {/* Step 01 */}
              <div className="border-l border-gray-200 pl-8">
                <div className="text-gray-400 text-sm font-medium mb-4">01.</div>
                <h3 className="text-2xl font-light text-black mb-6">Brief us</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  Provide your project details for us to better align our web design, development, and brand identity
                  design services with your needs.
                </p>
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Step 02 */}
              <div className="border-l border-gray-200 pl-8">
                <div className="text-gray-400 text-sm font-medium mb-4">02.</div>
                <h3 className="text-2xl font-light text-black mb-6">Meet us online</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Share your project information so we can accurately adjust our web design and development services to
                  suit your requirements.
                </p>
              </div>

              {/* Step 03 */}
              <div className="border-l border-gray-200 pl-8">
                <div className="text-gray-400 text-sm font-medium mb-4">03.</div>
                <h3 className="text-2xl font-light text-black mb-6">Free estimation</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Receive a detailed estimate from us, designed to provide a clear overview of the costs tailored to your
                  project's unique requirements.
                </p>
              </div>

              {/* Step 04 */}
              <div className="border-l border-gray-200 pl-8">
                <div className="text-gray-400 text-sm font-medium mb-4">04.</div>
                <h3 className="text-2xl font-light text-black mb-6">Work together</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Collaborate closely with us to efficiently and effectively turn your project vision into reality,
                  ensuring comprehensive success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="relative z-10 w-full py-16 md:py-32 max-w-full overflow-x-hidden" style={{ backgroundColor: "#F6F6F6" }}>
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
                    step with us
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
      </main>
    </div>
  )
}
