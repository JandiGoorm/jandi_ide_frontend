import { useRef } from "react";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import IntroHeader from "../../../layouts/Components/IntroHeader";
import styles from "./IntroPage.module.css";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import IntroEditorPage from "./Components/IntroEditorPage";

const slides = [
  {
    titles: [
      "Write anything,",
      "Fill the green,",
      "Keep the rhythm of connection.",
    ],
    subtitles: [
      "코드를 쓰고, 기록을 채우고, 영감을 이어가세요.",
      "잔디처럼 자라날 당신의 성장을 기다립니다.",
    ],
    buttonText: "코딩테스트 준비",
    imgSrc: "/IntroEditor.png",
  },
  {
    titles: [
      "Say anything,",
      "Share the spark,",
      "Keep the rhythm of connection.",
    ],
    subtitles: [
      "아이디어를 말하고, 생각을 나누고, 흐름을 이어가세요.",
      "당신의 말에서 자라날 혁신을 기다립니다.",
    ],
    buttonText: "실시간 채팅 입장",
    imgSrc: "/IntroChat.png",
  },
  {
    titles: ["Find your path,", "Unlock new roles,", "Step into your future."],
    subtitles: [
      "당신의 커리어를 위한 정보와 기회를 제공합니다.",
      "채용 소식부터 커뮤니티 추천까지, 함께 성장해요.",
    ],
    buttonText: "지금 시작하세요",
    imgSrc: "/IntroMain.png",
  },
];

const IntroPage = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
    })
  ).current;

  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 50 }, [autoplay]);

  return (
    <BaseLayout header={<IntroHeader />}>
      <div className={styles.container}>
        <div className={styles.embla}>
          <div className={styles.embla__viewport} ref={emblaRef}>
            <div className={styles.embla__container}>
              {slides.map((slide, index) => (
                <div className={styles.embla__slide} key={index}>
                  <IntroEditorPage
                    titles={slide.titles}
                    subtitles={slide.subtitles}
                    buttonText={slide.buttonText}
                    imgSrc={slide.imgSrc}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default IntroPage;
