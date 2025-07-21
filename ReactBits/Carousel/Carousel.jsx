import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Rating } from 'react-simple-star-rating'
// replace icons with your own if needed

const DEFAULT_ITEMS = [
  {
    reviewRating: 5,
    reviewDescription: "This AI product has transformed the way I manage my daily tasks. It’s intuitive, fast, and incredibly accurate!",
    reviewDate: "2025-03-15T10:30:00.000Z",
    userName: "Emily Stone",
    userPhoto: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150",
  },
  {
    reviewRating: 3.6,
    reviewDescription: "Excellent service and very professional. Highly recommend!. It’s intuitive, fast, and incredibly accurate!",
    reviewDate: "2024-04-15T10:30:00.000Z",
    userName: "Emily Stone",
    userPhoto: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150",
  },
  {
    reviewRating: 5,
    reviewDescription: "It’s intuitive, fast, and incredibly accurate!Excellent service and very professional. Highly recommend!",
    reviewDate: "2023-06-15T10:30:00.000Z",
    userName: "Emily Stone",
    userPhoto: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150",
  },
  {
    reviewRating: 3.5,
    reviewDescription: "This AI product has transformed the way I manage my daily tasks. It’s intuitive, fast, and incredibly accurate! Excellent service and very professional. Highly recommend!",
    reviewDate: "2024-06-15T10:30:00.000Z",
    userName: "Emily Stone",
    userPhoto: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150",
  },
  {
    reviewRating: 4,
    reviewDescription: "Excellent service and very professional. Highly recommend!",
    reviewDate: "2025-07-15T10:30:00.000Z",
    userName: "Emily Stone",
    userPhoto: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150",
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  // console.log(items)
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${round
        ? "rounded-full border border-white"
        : "rounded-[24px] border border-[#222]"
        }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${round
                ? "items-center justify-center text-center bg-[rgb(6,0,16)] border-0"
                : "items-start justify-between bg-[#fff]"
                } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY: rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              {/* <div className="p-5">
                <div className="mb-1 font-black text-lg text-white">
                  {item.title}
                </div>
                <p className="text-sm text-white">{item.description}</p>
              </div> */}
              <div className="bg-linear-to-br from-[#272727] to-[#010433] text-neutral-content rounded-xl p-6 shadow-lg w-full">
                {/* Review Text */}
                <p className="text-xl mb-6 leading-relaxed italic">
                  "{item.reviewDescription}"
                </p>
                {/* Reviewer Info */}
                <div className='flex justify-between items-center mt-8 md:mt-14'>
                  <div className="flex items-center gap-3">
                    <img src={item.userPhoto} alt="userName" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                    <div>
                      <h4 className="font-semibold">{item.userName}</h4>
                      <Rating
                        initialValue={item.reviewRating}
                        allowFraction
                        readonly
                        size={20}
                        fillColorArray={[
                          '#f14f45',
                          '#f16c45',
                          '#f18845',
                          '#f1b345',
                          '#f1d045'
                        ]}
                      />
                    </div>
                  </div>

                  <div>
                    <p className='font-bold'>Review Date</p>
                    <p>{new Date(item.reviewDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
          }`}
      >
        <div className="mt-4 w-4/12 flex justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % items.length === index
                ? round
                  ? "bg-white"
                  : "bg-[#333333]"
                : round
                  ? "bg-[#555]"
                  : "bg-[rgba(51,51,51,0.4)]"
                }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
