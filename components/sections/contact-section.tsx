"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const businessTypes = [
  "Restaurant / Cafe",
  "Hotel / Stay",
  "Wedding Vendor",
  "D2C Brand",
  "Clinic / Healthcare",
  "Other",
]

const budgetRanges = [
  "₹10K - ₹20K",
  "₹20K - ₹50K",
  "₹50K - ₹1L",
  "₹1L - ₹2.5L",
  "₹2.5L - ₹5L",
  "₹5L+",
]

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  businessType: z.string().min(1, "Please select a business type"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message is too short"),
})

type FormData = z.infer<typeof formSchema>

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessType: "",
      budgetRange: "",
      message: "",
    },
  })

  const currentBusinessType = watch("businessType")
  const currentBudgetRange = watch("budgetRange")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError("")
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...data,
        }),
      })
      
      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
      } else {
        setSubmitError(result.message || "Something went wrong.")
      }
    } catch (error) {
      setSubmitError("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-secondary/20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-technical text-[10px] md:text-[12px] text-primary mb-8">
              Enquiry
            </p>
            <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-foreground mb-10 leading-[0.95]">
              Let&apos;s build something
              <br />
              <span className="italic text-primary">worth remembering.</span>
            </h2>
            <p className="text-[18px] md:text-[22px] text-muted-foreground leading-relaxed mb-16 max-w-md italic font-serif">
              We respond to every enquiry within the same day. Tell us about your ambition.
            </p>

            {/* Primary Action - WhatsApp */}
            <div className="mb-16">
              <a 
                href="https://wa.me/917891998448" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-6 px-10 py-5 border border-[#25D366]/30 text-foreground font-sans font-medium uppercase tracking-[0.1em] text-[12px] hover:bg-[#25D366] hover:text-[#050505] hover:border-[#25D366] hover:scale-105 transition-all duration-500 ease-[0.19,1,0.22,1]"
              >
                <span>+91 78919 98448</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#25D366] group-hover:text-inherit"
                >
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
              </a>
              <p className="mt-4 text-technical text-[9px] text-muted-foreground ml-2">
                Fastest response
              </p>
            </div>

            {/* Email Details */}
            <div className="space-y-8 pt-12 border-t border-border">
              <div>
                <p className="text-technical text-[9px] text-muted-foreground mb-4">
                  Email
                </p>
                <a 
                  href="mailto:buildblock8@gmail.com" 
                  className="text-[20px] text-foreground hover:text-primary transition-colors duration-500 font-serif italic"
                >
                  buildblock8@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="bg-card p-10 md:p-16 border border-border"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-display text-[2.5rem] text-foreground mb-4">Message sent</h3>
                <p className="text-muted-foreground italic font-serif text-[18px]">
                  Thanks for reaching out. We reply the same day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                
                {submitError && (
                  <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 text-[14px]">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative group">
                    <label htmlFor="name" className="block text-technical text-[10px] text-muted-foreground mb-4 group-focus-within:text-primary transition-colors">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`w-full px-0 py-2 bg-transparent border-b ${errors.name ? 'border-destructive' : 'border-border'} focus:border-primary text-foreground placeholder-muted-foreground/50 focus:outline-none transition-colors duration-500 font-serif italic text-[18px]`}
                      placeholder="Enter name"
                    />
                    {errors.name && <p className="text-destructive text-[11px] mt-2">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <label htmlFor="email" className="block text-technical text-[10px] text-muted-foreground mb-4 group-focus-within:text-primary transition-colors">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-0 py-2 bg-transparent border-b ${errors.email ? 'border-destructive' : 'border-border'} focus:border-primary text-foreground placeholder-muted-foreground/50 focus:outline-none transition-colors duration-500 font-serif italic text-[18px]`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-destructive text-[11px] mt-2">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div className="relative group">
                  <label htmlFor="phone" className="block text-technical text-[10px] text-muted-foreground mb-4 group-focus-within:text-primary transition-colors">
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.phone ? 'border-destructive' : 'border-border'} focus:border-primary text-foreground placeholder-muted-foreground/50 focus:outline-none transition-colors duration-500 font-serif italic text-[18px]`}
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-destructive text-[11px] mt-2">{errors.phone.message}</p>}
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-technical text-[10px] text-muted-foreground mb-6">
                    Business Type *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setValue("businessType", type, { shouldValidate: true })}
                        className={`px-5 py-3 text-[11px] uppercase tracking-[0.1em] transition-all duration-300 border ${
                          currentBusinessType === type
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.businessType && <p className="text-destructive text-[11px] mt-2">{errors.businessType.message}</p>}
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-technical text-[10px] text-muted-foreground mb-6">
                    Budget Range *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setValue("budgetRange", range, { shouldValidate: true })}
                        className={`px-5 py-3 text-[11px] uppercase tracking-[0.1em] font-sans transition-all duration-300 border ${
                          currentBudgetRange === range
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  {errors.budgetRange && <p className="text-destructive text-[11px] mt-2">{errors.budgetRange.message}</p>}
                </div>

                {/* Message */}
                <div className="relative group">
                  <label htmlFor="message" className="block text-technical text-[10px] text-muted-foreground mb-4 group-focus-within:text-primary transition-colors">
                    Brief Description *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.message ? 'border-destructive' : 'border-border'} focus:border-primary text-foreground placeholder-muted-foreground/50 focus:outline-none transition-colors duration-500 resize-none font-serif italic text-[18px]`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-destructive text-[11px] mt-2">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-4 px-10 py-6 text-[12px] uppercase tracking-[0.2em] font-medium text-background bg-foreground hover:bg-primary transition-all duration-700 disabled:opacity-70 group"
                >
                  {isSubmitting ? "Sending..." : "Send it — we reply same day"}
                  {!isSubmitting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-2 transition-transform duration-500"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
