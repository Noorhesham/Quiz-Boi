import CategoreyCard from "./CategoreyCard";
import Motion from "./Motion";

const Categories = ({ setCategorey,categories }: { setCategorey: any,categories:any }) => {
  return (
    <>
      <Motion className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-4 justify-center">
        <CategoreyCard large={true} tag={categories?.[0]} setCategorey={setCategorey} />
        <Motion className=" grid grid-cols-2 sm:grid-cols-2  justify-items-center  md:grid-cols-3 gap-4">
          {categories?.slice(1, 7).map((tag: any,i:number) => (
            <CategoreyCard key={i} tag={tag} setCategorey={setCategorey} />
          ))}
        </Motion>
      </Motion>
    </>
  );
};

export default Categories;
