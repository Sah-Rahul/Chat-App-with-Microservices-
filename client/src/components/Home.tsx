import Image from "next/image";
import bgImage from "../../public/images/bg.webp";
import girlImg from "../../public/images/hero-3.webp";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#078872] relative overflow-hidden">
      <div>
        <Image src={bgImage} alt="bg" fill className="object-cover" />
      </div>

      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-white text-5xl md:text-6xl lg:text-6xl font-bold uppercase leading-tight">
                Learn new <br />
                skills online <br />
                with top
              </h1>
              <div className="relative">
                <span className="uppercase text-4xl md:text-5xl lg:text-6xl font-bold text-[#f3a226] block">
                  educators.
                </span>

                <div className="w-32 h-16 mt-4 absolute -top-16 right-40 md:right-52 animate-bounce-slow">
                  <svg
                    viewBox="0 0 150 80"
                    className="w-full h-full"
                    fill="none"
                  >
                    <path
                      d="M10 40 Q 50 20, 90 40"
                      stroke="#f3a226"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />

                    <path
                      d="M 80 30 L 95 40 L 80 50"
                      stroke="#f3a226"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-gray-200 text-lg max-w-xl">
                We are experienced in educational platform and skilled
                strategies for the success of our online learning.
              </p>

              <button className="bg-[#1a7368] text-white cursor-pointer px-8 py-4 rounded-lg font-semibold transition mt-6">
                Find The Course →
              </button>
            </div>

            <div className="relative h-125 lg:h-160 w-full">
              <Image
                src={girlImg}
                alt="Student learning"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes draw-line {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-draw-line {
          animation: draw-line 2s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
