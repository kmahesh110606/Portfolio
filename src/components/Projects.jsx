import React from 'react'

function TechPill({ name }) {
  return (
    <span className="inline-block text-xs px-2 py-1 mr-2 mt-2 rounded-full bg-gray-100 text-gray-800">{name}</span>
  )
}

export default function Projects({ projects = [] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p, idx) => (
        <article key={idx} className="p-5 rounded-xl shadow-sm hover:shadow-md transition bg-white">
          <h3 className="font-semibold text-lg text-center md:text-left">{p.title}</h3>
          <p className="text-gray-600 mt-2">{p.description}</p>
          <div className="mt-4">
            {p.tech && p.tech.map((t) => <TechPill key={t} name={t} />)}
          </div>
          {p.link && (
            <div className="mt-4">
              <a href={p.link} className="text-purple-600 hover:underline">
                View project →
              </a>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
