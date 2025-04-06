/* eslint-disable react/prop-types */

const Submissions = ({ submissions }) => {
  const { submitted, unsubmitted } = submissions;
  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold font-Montserrat tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">S.no</th>
              <th className="px-4 py-3">student name</th>
              <th className="px-4 py-3">submission status</th>
              <th className="px-4 py-3">marks</th>
            </tr>
          </thead>
          <tbody className="bg-white text-center">
            {submitted &&
              submitted.map((stu, index) => {
                return (
                  <tr className="text-gray-700" key="id">
                    <td className="px-4 py-3 text-md font-semibold border">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{stu.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm">
                        {" "}
                        submitted
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold  border">
                      {stu.marks}
                    </td>
                  </tr>
                );
              })}
            {unsubmitted &&
              unsubmitted.map((stu, index) => {
                return (
                  <tr className="text-gray-700" key="id">
                    <td className="px-4 py-3 text-md font-semibold border">
                      {submitted.length + index + 1}
                    </td>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{stu}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        {" "}
                        Not submitted
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold  border">
                      --
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
