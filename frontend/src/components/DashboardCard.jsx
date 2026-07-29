function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-6">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
            {title}
          </p>

          <h2 className={`text-3xl font-bold mt-3 ${color}`}>
            {value}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default DashboardCard;