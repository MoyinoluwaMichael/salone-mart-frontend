import { categories } from "@/constant/data";



const CategorySection = () => {

    
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Shop By Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <a
            href="#"
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col items-center text-center p-4"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
              <img
                src={category.icon}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-gray-800">{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}


export default CategorySection;