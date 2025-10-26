import React from 'react'
import { Phone12Filled, Mail12Filled, PeopleCall16Filled } from '@fluentui/react-icons'
import { FaPhone, FaWhatsapp, FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Contact({ contact = {}, socials = [] }) {
  // provide sensible defaults if data.js not filled
  const email = contact.email || 'kmahesh110606@outlook.com'
  const phone = contact.phone || '8591495253'
  const whatsapp = contact.whatsapp || '918591495253'
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="p-6 rounded-lg bg-transparent">
        <h3 className="font-semibold text-lg">Get in touch</h3>
        <p className="mt-2 text-gray-700">{contact.note}</p>
        <div className="mt-4 flex items-center gap-4">
          {/* Mail pill - expands on hover */}
          <a href={`mailto:${email}`} className="pill icon-only">
            <span className="icon"><Mail12Filled className="w-5 h-5" /></span>
            <span className="label">{email}</span>
          </a>

          {/* Call pill */}
          <a href={`tel:${phone}`} className="pill icon-only">
            <span className="icon">{PeopleCall16Filled ? <PeopleCall16Filled className="w-5 h-5" /> : <FaPhone className="w-5 h-5" />}</span>
            <span className="label">Call {phone}</span>
          </a>

          {/* WhatsApp pill */}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="pill icon-only">
            <span className="icon"><FaWhatsapp className="w-5 h-5" /></span>
            <span className="label">WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-transparent text-center">
        <h4 className="font-semibold text-center">Socials</h4>
        <div className="mt-3 flex items-center justify-center gap-4">
          {/* social pills: show username on hover */}
          <a href={`https://www.linkedin.com/in/kmahesh110606`} target="_blank" rel="noreferrer" className="pill icon-only">
            <span className="icon"><FaLinkedin className="w-5 h-5" /></span>
            <span className="label">@kmahesh110606</span>
          </a>
          <a href={`https://github.com/kmahesh110606`} target="_blank" rel="noreferrer" className="pill icon-only">
            <span className="icon"><FaGithub className="w-5 h-5" /></span>
            <span className="label">@kmahesh110606</span>
          </a>
          <a href={`https://www.instagram.com/kmahesh110606`} target="_blank" rel="noreferrer" className="pill icon-only">
            <span className="icon"><FaInstagram className="w-5 h-5" /></span>
            <span className="label">@kmahesh110606</span>
          </a>
          <a href={`https://twitter.com/kmahesh110606`} target="_blank" rel="noreferrer" className="pill icon-only">
            <span className="icon"><FaTwitter className="w-5 h-5" /></span>
            <span className="label">@kmahesh110606</span>
          </a>
        </div>
        <div className="mt-6 text-sm text-gray-500">Or connect via the icons above.</div>
      </div>
    </div>
  )
}
