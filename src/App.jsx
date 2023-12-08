// import Select from "../components/select";
import $ from "jquery";
import { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaBirthdayCake } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";



function App() {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    dob: "",
  });

  const formatDOB = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  };

  const generateRandomUser = () => {
    // Make the AJAX request with the selected gender
    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        const user = data.results[0];

        const formattedDOB = formatDOB(user.dob.date);

        setUserData({
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          address: `${user.location.street.number} ${user.location.street.name}`,
          country: user.country,
          email: user.email,
          phone: user.phone,
          dob: formattedDOB,
          picture: user.picture.large,
        });
      },
    });
  };
  return (
    <div className="bg-[#ebf2fa] h-screen">
      <header className="flex flex-col items-center justify-center gap-2 bg-[#064789] p-10">
        <h1 className="text-5xl font-bold text-white">
          Random User Data Generator
        </h1>
        <p className="font-medium text-white text-xl">
          A page for generating random users
        </p>
      </header>

      <main className="pt-8 px-20">
        <button
          className="bg-[#064789] rounded-md text-white px-[.8rem] py-[.6rem] mt-16 items-center flex justify-center"
          onClick={generateRandomUser}
          type="submit"
        >
          Generate
        </button>

       {userData.name && (
        <section className="mt-16 flex gap-8">
          <div>
            <img src={userData.picture} alt="" className="rounded-full" />
          </div>
          <div>
            <p className="text-lg font-medium flex items-center gap-2">
            <RxAvatar color="#064789" />
            {userData.name}</p>
            <p className="capitalize text-lg font-medium flex items-center gap-2">
            <PiGenderIntersexBold color="#064789" />
            {userData.gender}</p>
            <p className="text-lg font-medium flex items-center gap-2">
            <FaAddressBook color="#064789" />
            {userData.address}
            </p>

            <p className="text-lg font-medium flex items-center gap-2">
            <FaGlobe color="#064789" />
            {userData.country}</p>

            <p className="text-lg font-medium flex items-center gap-2">
            <MdEmail color="#064789" />
            {userData.email}</p>
            <p className="text-lg font-medium flex items-center gap-2">
            <FaPhone color="#064789" />
            {userData.phone}</p>
            <p className="text-lg font-medium flex items-center gap-2">
            <FaBirthdayCake color="#064789" />
            {userData.dob}</p>
          </div>
        </section>
       )}
      </main>
    </div>
  );
}

export default App;
