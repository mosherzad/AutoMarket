// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaUser,
// } from "react-icons/fa";

// const SellerInfo = ({ user }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm space-y-4 border w-full md:w-1/2">
//       <h2 className="text-lg font-semibold">Seller Information</h2>
//       <hr />
//       <div className="flex items-center gap-4">
//         <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//           <FaUser className="text-gray-500 text-xl" />
//         </div>

//         <div>
//           <p className="font-medium">{user.username}</p>
//           <p className="text-sm text-gray-500">
//             Member since{" "}
//             {user.createdAt && (
//               <>Member since {new Date(user.createdAt).toLocaleDateString()}</>
//             )}
//           </p>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <InfoRow
//           icon={<FaPhoneAlt />}
//           label="Phone"
//           value="+964 770 123 4567"
//         />
//         <InfoRow
//           icon={<FaMapMarkerAlt />}
//           label="Location"
//           value="Baghdad, Iraq"
//         />
//         <InfoRow
//           icon={<FaCalendarAlt />}
//           label="Post Date"
//           value="12-24-2025"
//         />
//       </div>

//       {/* <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-200 cursor-pointer">
//         Contact Seller
//       </button> */}
//     </div>
//   );
// };

// export default SellerInfo;

// function InfoRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center gap-3 text-sm">
//       <span className="text-red-600 text-[15px]">{icon}</span>
//       <span className="text-gray-500 text-[15px]">{label}:</span>
//       <span className="font-medium text-[15px]">{value}</span>
//     </div>
//   );
// }
