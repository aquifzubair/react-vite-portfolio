import { motion } from 'framer-motion';
import { HiCode, HiServer, HiDatabase, HiLightningBolt } from 'react-icons/hi';
import Section, { SectionHeader } from './Section';
import Card, { CardBody } from './Card';

const About = () => {
  const stats = [
    { icon: HiCode, label: 'Years Experience', value: '5+' },
    { icon: HiServer, label: 'Projects Completed', value: '25+' },
    { icon: HiDatabase, label: 'Technologies', value: '15+' },
    { icon: HiLightningBolt, label: 'Performance Boost', value: '70%' },
  ];

  const highlights = [
    'Recently promoted to Senior Software Engineer in April 2025',
    'Specialized in Node.js and microservices architecture with 5+ years experience',
    'Proven track record of leading teams and optimizing system performance by up to 70%',
    'Expert in implementing solutions for high-traffic applications',
    'Strong technical leadership and delivery capabilities',
    'Experience with PostgreSQL, MySQL, Redis, and MongoDB databases',
    'Implemented Azure Active Directory and Okta SSO solutions',
    'Built analytics dashboards replacing AWS QuickSight, improving flexibility by 40%',
    'Led code reviews for 8+ developers maintaining 95%+ code quality standards',
    'Developed secure payment gateway APIs processing 1,000+ daily transactions',
  ];

  return (
    <Section id="about" background="bg-gray-50 dark:bg-gray-900">
      <SectionHeader
        subtitle="Get to know me"
        title="About Me"
        description="Passionate software engineer with 5+ years of experience building scalable backend solutions"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Building the Future, One Line of Code at a Time
          </h3>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              I'm a passionate Senior Software Engineer with over 5 years of
              experience specializing in backend development and system
              architecture. Recently promoted in April 2025 at Leucine - AI for
              Pharma, I focus on building scalable microservices and
              implementing enterprise-level solutions for high-traffic
              applications.
            </p>

            <p>
              My journey in software development has taken me through various
              domains, from e-commerce platforms to enterprise AI applications.
              I have a proven track record of optimizing system performance by
              up to 70%, leading cross-functional teams, and delivering
              high-quality software solutions that drive business growth and
              enhance user experience.
            </p>

            <p>
              When I'm not coding, I enjoy exploring new technologies,
              contributing to open-source projects, and mentoring junior
              developers. I believe in continuous learning, staying updated with
              the latest industry trends, and sharing knowledge through code
              reviews and technical guidance.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column - Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
                  <CardBody>
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Personal Image Placeholder */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <CardBody>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-white">AZ</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Aquif Zubair
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Senior Software Engineer
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Bangalore, India
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
