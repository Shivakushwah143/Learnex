// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BookOpen, Users, Award, Zap, ArrowRight, Play } from 'lucide-react';

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         {/* Geometric background */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500 rotate-45 animate-pulse"></div>
//           <div className="absolute top-40 right-20 w-24 h-24 border border-blue-400 rotate-12 animate-pulse"></div>
//           <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-green-400 rotate-45 animate-pulse"></div>
//         </div>

//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-8">
//             <Zap className="h-4 w-4 text-purple-400 mr-2" />
//             <span className="text-purple-300 text-sm">Next-Gen Learning Platform</span>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold mb-8">
//             <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
//               Master the Future
//             </span>
//             <br />
//             <span className="text-white">of Technology</span>
//           </h1>

//           <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
//             Unlock your potential with cutting-edge courses designed for the digital age. 
//             Join thousands of learners advancing their careers with our immersive learning experience.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <Link
//               to="/courses"
//               className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25"
//             >
//               <span className="text-lg font-semibold">Explore Courses</span>
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Link>

//             <button className="group px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white rounded-full transition-all duration-200 flex items-center space-x-2">
//               <Play className="h-5 w-5 text-green-400" />
//               <span className="text-lg">Watch Demo</span>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Why Choose <span className="text-purple-400">CyberEdu</span>?
//             </h2>
//             <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//               Experience learning like never before with our innovative approach to education
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: BookOpen,
//                 title: "Interactive Learning",
//                 description: "Engage with cutting-edge content through hands-on projects and real-world applications",
//                 color: "purple"
//               },
//               {
//                 icon: Users,
//                 title: "Expert Instructors",
//                 description: "Learn from industry leaders and experienced professionals at the forefront of technology",
//                 color: "blue"
//               },
//               {
//                 icon: Award,
//                 title: "Certified Success",
//                 description: "Earn recognized credentials and build a portfolio that showcases your new skills",
//                 color: "green"
//               }
//             ].map((feature, index) => (
//               <div key={index} className="group relative">
//                 <div className={`absolute -inset-0.5 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>
//                 <div className="relative bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
//                   <div className={`inline-flex p-3 bg-${feature.color}-500/10 border border-${feature.color}-500/30 rounded-lg mb-4`}>
//                     <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
//                   </div>
//                   <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
//                   <p className="text-gray-400">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Career?
//           </h2>
//           <p className="text-xl text-gray-300 mb-10">
//             Join our community of learners and start building the skills that matter in today's digital world
//           </p>
          
//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <Link
//               to="/login"
//               className="px-10 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 text-lg font-semibold shadow-lg hover:shadow-green-500/25"
//             >
//               Start Learning Today
//             </Link>
//             <Link
//               to="/admin/signup"
//               className="px-10 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white rounded-full transition-all duration-200 text-lg font-semibold"
//             >
//               Become an Instructor
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Zap, ArrowRight, Play } from 'lucide-react';

const Home: React.FC = () => {
  // Unsplash image URLs (replace with your actual image URLs)
  const heroBackground = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80";
  const feature1Image = "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const feature2Image = "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const feature3Image = "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80";
  const ctaBackground = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className="min-h-screen">
      {/* Hero Section with background image */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(rgba(30, 30, 46, 0.85), rgba(30, 30, 46, 0.95)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Geometric background overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500 rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-blue-400 rotate-12 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-green-400 rotate-45 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-8">
            <Zap className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm">Next-Gen Learning Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Master the Future
            </span>
            <br />
            <span className="text-white">of Technology</span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Unlock your potential with cutting-edge courses designed for the digital age. 
            Join thousands of learners advancing their careers with our immersive learning experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/courses"
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25"
            >
              <span className="text-lg font-semibold">Explore Courses</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="group px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white rounded-full transition-all duration-200 flex items-center space-x-2">
              <Play className="h-5 w-5 text-green-400" />
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-purple-400">Learnx</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience learning like never before with our innovative approach to education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Interactive Learning",
                description: "Engage with cutting-edge content through hands-on projects and real-world applications",
                color: "purple",
                image: feature1Image
              },
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from industry leaders and experienced professionals at the forefront of technology",
                color: "blue",
                image: feature2Image
              },
              {
                icon: Award,
                title: "Certified Success",
                description: "Earn recognized credentials and build a portfolio that showcases your new skills",
                color: "green",
                image: feature3Image
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>
                <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 overflow-hidden">
                  {/* Feature image */}
                  <div 
                    className="h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  ></div>
                  
                  <div className="p-8">
                    <div className={`inline-flex p-3 bg-${feature.color}-500/10 border border-${feature.color}-500/30 rounded-lg mb-4`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with background image */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          background: `linear-gradient(rgba(30, 30, 46, 0.9), rgba(30, 30, 46, 0.9)), url(${ctaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join our community of learners and start building the skills that matter in today's digital world
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/login"
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 text-lg font-semibold shadow-lg hover:shadow-green-500/25"
            >
              Start Learning Today
            </Link>
            <Link
              to="/admin/signup"
              className="px-10 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white rounded-full transition-all duration-200 text-lg font-semibold"
            >
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;