import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function StatsCounter() {
  const [hasViewed, setHasViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Adjust for sensitivity
  });

  if (inView && !hasViewed) setHasViewed(true);

  return (
    <div ref={ref} className="bg-white text-gray-800 py-20 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Our Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {/* Stat 1 */}
        <div className="p-8 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-5xl font-bold text-blue-600">
            {hasViewed && (
              <CountUp start={0} end={150} duration={3} delay={0.5} />
            )}
          </h3>
          <p className="mt-2 text-lg text-gray-600">Projects Completed</p>
        </div>

        {/* Stat 2 */}
        <div className="p-8 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-5xl font-bold text-blue-600">
            {hasViewed && (
              <CountUp start={0} end={200} duration={3} delay={0.5} />
            )}
          </h3>
          <p className="mt-2 text-lg text-gray-600">Students Sponsored</p>
        </div>

        {/* Stat 3 */}
        <div className="p-8 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-5xl font-bold text-blue-600">
            {hasViewed && (
              <CountUp start={0} end={50} duration={3} delay={0.5} />
            )}
          </h3>
          <p className="mt-2 text-lg text-gray-600">Volunteers Joined</p>
        </div>
      </div>
    </div>
  );
}
