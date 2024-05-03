import { roadmap } from "@/constants";
import GlobalButton from "./GlobalButton";
import Heading2 from "./Heading2";

const RoadMap = () => {
  return (
    <section className="overflow-hidden" id="roadmap">
      <div className="container md:pb-10">
        <Heading2  title="What we’re working on" />

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
          {roadmap.map((item:any) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <div
                className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                  item.colorful ? "conic" : "bg-slate-700"
                }`}
                key={item.id}
              >
                <div className="relative p-8 bg-black/70 rounded-[2.4375rem] overflow-hidden xl:p-15">
                  <div className="absolute top-0 left-0 max-w-full">
                    <img className="w-full" src={'/grid.png'} width={550} height={550} alt="Grid" />
                  </div>
                  <div className="relative z-1">
                    <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                      {/* <TagLine>{item.date}</TagLine> */}

                      <div className="flex items-center px-4 py-1 bg-gray-50 rounded text-black/90">
                        <img
                          className="mr-2.5"
                          src={item.status === "done" ? "/check-02.svg" : "/loading-01.svg"}
                          width={16}
                          height={16}
                          alt={status}
                        />
                        <div className="tagline">{status}</div>
                      </div>
                    </div>

                    <div className="mb-10 -my-10 -mx-15">
                      <img className="w-full" src={item.imageUrl} width={628} height={426} alt={item.title} />
                    </div>
                    <h4 className="h4 text-gray-50 mb-4">{item.title}</h4>
                    <p className="body-2 text-gray-400">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
          <GlobalButton text="Me"/>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
