'use client'

import Image from 'next/image'

export default function TestingDebateStyle() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-size background image for current debate round */}
      <Image
        src={'/debate/scene-1.webp'}
        alt="Debate Round"
        layout="fill"
        objectFit="cover"
      />
      <div className="container absolute bottom-0 flex left-[50%] -translate-x-[50%]  gap-8 items-end py-10">
        <div className="flex w-full justify-between items-end">
          {/* Text Box with Typing Effect */}
          <div className="w-full bg-black/70 rounded-lg p-6  min-h-[200px] border-4 border-blue-400">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Alan Turing
            </h2>
            <p className="text-xl text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius vel
              nesciunt quaerat voluptate recusandae velit architecto quos,
              delectus ad quidem possimus quo, a ipsam quibusdam illo quasi
              eaque qui dicta.
            </p>
          </div>
        </div>

        {/* Next Button */}
      </div>
    </div>
  )
}
