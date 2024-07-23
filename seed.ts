import mongoose from "mongoose";

const businesses = [
  {
    name: "Café Café",
    about: "A popular café chain in Israel",
    category: "Food & Beverage",
    phone: "03-1234567",
    email: "cafecafe@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Rothschild Blvd 22",
  },
  {
    name: "Aroma Espresso Bar",
    about: "A chain of coffee shops",
    category: "Food & Beverage",
    phone: "03-7654321",
    email: "aroma@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Dizengoff St 50",
  },
  {
    name: "Burger Ranch",
    about: "Fast food chain specializing in burgers",
    category: "Food & Beverage",
    phone: "04-1234567",
    email: "burger@example.com",
    district: "Northern District",
    city: "Haifa",
    street: "Moriah Blvd 99",
  },
  {
    name: "Super-Pharm",
    about: "A major drugstore chain",
    category: "Healthcare",
    phone: "09-7654321",
    email: "superpharm@example.com",
    district: "Central District",
    city: "Herzliya",
    street: "Sokolov St 45",
  },
  {
    name: "Rami Levy",
    about: "A supermarket chain offering affordable groceries",
    category: "Retail",
    phone: "02-9876543",
    email: "ramilevy@example.com",
    district: "Jerusalem District",
    city: "Jerusalem",
    street: "Jaffa Rd 10",
  },
  {
    name: "Shufersal",
    about: "One of the largest supermarket chains in Israel",
    category: "Retail",
    phone: "03-9876543",
    email: "shufersal@example.com",
    district: "Central District",
    city: "Ramat Gan",
    street: "Bialik St 20",
  },
  {
    name: "Fox",
    about: "Popular clothing and fashion retailer",
    category: "Fashion",
    phone: "08-1231231",
    email: "fox@example.com",
    district: "Southern District",
    city: "Ashdod",
    street: "Herzl Blvd 12",
  },
  {
    name: "Castro",
    about: "Leading fashion and clothing store",
    category: "Fashion",
    phone: "08-7654321",
    email: "castro@example.com",
    district: "Southern District",
    city: "Beersheba",
    street: "Rager Blvd 100",
  },
  {
    name: "Clalit Health Services",
    about: "Major health services provider",
    category: "Healthcare",
    phone: "02-1234567",
    email: "clalit@example.com",
    district: "Jerusalem District",
    city: "Jerusalem",
    street: "Ben Yehuda St 5",
  },
  {
    name: "Maccabi Health Services",
    about: "Healthcare provider offering comprehensive services",
    category: "Healthcare",
    phone: "03-7654321",
    email: "maccabi@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Allenby St 30",
  },
  {
    name: "Egged",
    about: "The largest transit bus company in Israel",
    category: "Transport",
    phone: "02-2345678",
    email: "egged@example.com",
    district: "Jerusalem District",
    city: "Jerusalem",
    street: "Yaffo St 22",
  },
  {
    name: "Dan Bus Company",
    about: "Public transportation provider in Gush Dan",
    category: "Transport",
    phone: "03-3456789",
    email: "dan@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Namir Rd 85",
  },
  {
    name: "El Al",
    about: "Israel's national airline",
    category: "Transport",
    phone: "03-7123456",
    email: "elal@example.com",
    district: "Central District",
    city: "Lod",
    street: "Ben Gurion Airport",
  },
  {
    name: "Harel Insurance",
    about: "Leading insurance and finance group",
    category: "Insurance",
    phone: "03-5671234",
    email: "harel@example.com",
    district: "Central District",
    city: "Ramat Gan",
    street: "Jabotinsky St 155",
  },
  {
    name: "Clal Insurance",
    about: "Insurance, pension, and financial services",
    category: "Insurance",
    phone: "03-5781234",
    email: "clal@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Arlozorov St 23",
  },
  {
    name: "Bank Hapoalim",
    about: "One of Israel's largest banks",
    category: "Finance",
    phone: "03-6571234",
    email: "hapoalim@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Rothschild Blvd 19",
  },
  {
    name: "Bank Leumi",
    about: "A major Israeli bank",
    category: "Finance",
    phone: "03-6581234",
    email: "leumi@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Yehuda Halevi St 34",
  },
  {
    name: "Bank Discount",
    about: "One of the largest banks in Israel",
    category: "Finance",
    phone: "03-6591234",
    email: "discount@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Herzl St 18",
  },
  {
    name: "Bezeq",
    about: "Leading telecommunications provider",
    category: "Telecom",
    phone: "03-6101234",
    email: "bezeq@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Begin Rd 132",
  },
  {
    name: "Partner Communications",
    about: "Telecommunications and media services",
    category: "Telecom",
    phone: "03-6191234",
    email: "partner@example.com",
    district: "Central District",
    city: "Rosh HaAyin",
    street: "Ariel Sharon St 8",
  },
  {
    name: "Cellcom",
    about: "Leading cellular provider",
    category: "Telecom",
    phone: "03-6201234",
    email: "cellcom@example.com",
    district: "Central District",
    city: "Netanya",
    street: "Hapardes St 7",
  },
  {
    name: "Pelephone",
    about: "Pioneering mobile operator",
    category: "Telecom",
    phone: "03-6211234",
    email: "pelephone@example.com",
    district: "Central District",
    city: "Givatayim",
    street: "Aliyat Hanoar St 4",
  },
  {
    name: "Strauss Group",
    about: "Food and beverage manufacturer",
    category: "Food & Beverage",
    phone: "03-6281234",
    email: "strauss@example.com",
    district: "Northern District",
    city: "Nahariya",
    street: "Hameyasdim St 52",
  },
  {
    name: "Tnuva",
    about: "Dairy and food products producer",
    category: "Food & Beverage",
    phone: "03-6291234",
    email: "tnuva@example.com",
    district: "Central District",
    city: "Rehovot",
    street: "Herzl St 90",
  },
  {
    name: "Osem",
    about: "Leading food products company",
    category: "Food & Beverage",
    phone: "03-6301234",
    email: "osem@example.com",
    district: "Central District",
    city: "Petah Tikva",
    street: "Ben Gurion Blvd 12",
  },
  {
    name: "Teva Pharmaceuticals",
    about: "Pharmaceutical company",
    category: "Healthcare",
    phone: "03-6381234",
    email: "teva@example.com",
    district: "Central District",
    city: "Petah Tikva",
    street: "Homa Umigdal St 5",
  },
  {
    name: "Rafael Advanced Defense Systems",
    about: "Defense technology company",
    category: "Defense",
    phone: "04-1235678",
    email: "rafael@example.com",
    district: "Northern District",
    city: "Haifa",
    street: "HaHistadrut Blvd 45",
  },
  {
    name: "Elbit Systems",
    about: "International defense electronics company",
    category: "Defense",
    phone: "04-2345678",
    email: "elbit@example.com",
    district: "Northern District",
    city: "Haifa",
    street: "Matam Park",
  },
  {
    name: "Israel Aerospace Industries",
    about: "Aerospace and defense company",
    category: "Aerospace",
    phone: "03-1236789",
    email: "iai@example.com",
    district: "Central District",
    city: "Lod",
    street: "Ben Gurion Airport",
  },
  {
    name: "Ness Technologies",
    about: "Global IT services provider",
    category: "Technology",
    phone: "03-6781234",
    email: "ness@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Menachem Begin St 44",
  },
  {
    name: "Matrix",
    about: "IT services and solutions company",
    category: "Technology",
    phone: "03-6791234",
    email: "matrix@example.com",
    district: "Central District",
    city: "Herzliya",
    street: "Maskit St 8",
  },
  {
    name: "Intel Israel",
    about: "Semiconductor manufacturer",
    category: "Technology",
    phone: "08-1234568",
    email: "intel@example.com",
    district: "Central District",
    city: "Kiryat Gat",
    street: "Intel Rd 1",
  },
  {
    name: "IBM Israel",
    about: "IT and consulting company",
    category: "Technology",
    phone: "03-6123456",
    email: "ibm@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "HaBarzel St 34",
  },
  {
    name: "Check Point Software Technologies",
    about: "Cybersecurity company",
    category: "Technology",
    phone: "03-6134567",
    email: "checkpoint@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "HaShalom Rd 5",
  },
  {
    name: "NICE Systems",
    about: "Software solutions for customer experience",
    category: "Technology",
    phone: "09-7756789",
    email: "nice@example.com",
    district: "Central District",
    city: "Ra'anana",
    street: "Atidim Park",
  },
  {
    name: "Amot Investments",
    about: "Real estate investment company",
    category: "Real Estate",
    phone: "03-7756789",
    email: "amot@example.com",
    district: "Central District",
    city: "Ramat Gan",
    street: "Zeev Jabotinsky Rd 35",
  },
  {
    name: "Azrieli Group",
    about: "Real estate and holdings company",
    category: "Real Estate",
    phone: "03-7766789",
    email: "azrieli@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "Derech Menachem Begin 132",
  },
  {
    name: "Gazit-Globe",
    about: "Global real estate investment company",
    category: "Real Estate",
    phone: "03-7776789",
    email: "gazit@example.com",
    district: "Central District",
    city: "Tel Aviv",
    street: "HaShalom Rd 5",
  },
];

const users = [
  {
    email: "john.doe@example.com",
    password: "password123",
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
  },
  {
    email: "jane.smith@example.com",
    password: "mypassword456",
    username: "janesmith",
    firstName: "Jane",
    lastName: "Smith",
  },
  {
    email: "bob.johnson@example.com",
    password: "bobspassword789",
    username: "bobjohnson",
    firstName: "Bob",
    lastName: "Johnson",
  },
  {
    email: "alice.williams@example.com",
    password: "alicepass101",
    username: "alicewilliams",
    firstName: "Alice",
    lastName: "Williams",
  },
  {
    email: "michael.brown@example.com",
    password: "michaelpass202",
    username: "michaelbrown",
    firstName: "Michael",
    lastName: "Brown",
  },
];

// Generate reviews
const reviews = [
  {
    title: "Great Service",
    description:
      "The staff were incredibly friendly and the service was top-notch. Highly recommend!",

    rating: 5,
  },
  {
    title: "Good Quality",
    description:
      "I was impressed with the quality of the products. Will definitely come back!",

    rating: 4,
  },
  {
    title: "Very Satisfied",
    description:
      "Excellent experience overall. The food was delicious and the ambiance was great.",

    rating: 5,
  },
  {
    title: "Could Be Better",
    description:
      "The service was a bit slow, but the food was good. Room for improvement.",

    rating: 3,
  },
  {
    title: "Excellent",
    description:
      "Fantastic experience from start to finish. Will definitely recommend to others.",

    rating: 5,
  },
  {
    title: "Great Quality",
    description:
      "The products are of great quality and the staff is very helpful.",

    rating: 4,
  },
  {
    title: "Loved the Experience",
    description: "Had a wonderful time, the service was excellent.",

    rating: 5,
  },
  {
    title: "Good but Pricey",
    description: "The quality is good but it's a bit on the pricey side.",

    rating: 4,
  },
  {
    title: "Average Experience",
    description: "The experience was average, could be better.",

    rating: 3,
  },
  {
    title: "Not Satisfied",
    description: "The service was poor and the staff was rude.",

    rating: 2,
  },
  // Add more reviews to make a total of 70 reviews
];

// Seed the data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    // const newBusinesses = await Business.insertMany(businesses);
    // const newUsers = await User.insertMany(users);

    // const newBusinesses = await Business.find({});
    // const newUsers = await User.find({});

    // const filledReviews = newBusinesses.map((business) => {
    //   return newUsers.map((user, index) => {
    //     return {
    //       ...reviews[Math.floor(Math.random() * (reviews.length - 1))],
    //       businessId: business._id,
    //       userId: user._id,
    //       username: user.username,
    //     };
    //   });
    // });
    // console.log(`seed: `, filledReviews.flat(1));
    // const newReview = await Review.insertMany(filledReviews.flat(1));
    // const aggregate = await Review.aggregate([
    //   { $group: { _id: "$businessId", avgRating: { $avg: "$rating" } } },
    // ]);
    // const aggregate = await Business.find({});
    // console.log(`seed: `, aggregate);
    // await Promise.all(
    //   aggregate.map(async (business) => {
    //     await updateBusinessRating(business._id as string);
    //   })
    // );
    // const updatedReview = await Review.updateMany(
    //   {},
    //   { $inc: { likes: 1 } },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    // const newReview = await Review.find({});

    // const filledLikes = newReview.map((review) => {
    //   return {
    //     reviewId: review._id,
    //     userId: newUsers[Math.floor(Math.random() * 5)]._id,
    //   };
    // });
    // await Like.insertMany(filledLikes);

    // const duplicates = await Review.aggregate([
    //   {
    //     $group: {
    //       _id: { businessId: "$businessId", userId: "$userId" },
    //       count: { $sum: 1 },
    //       docs: { $push: "$_id" },
    //     },
    //   },
    //   {
    //     $match: {
    //       count: { $gt: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       count: 1,
    //       reviews: { $slice: ["$docs", 1, { $size: "$docs" }] },
    //     },
    //   },
    //   {
    //     $unwind: "$reviews",
    //   },
    // ]);
    // console.log(`seed: `, duplicates);
    // // await Promise.all(
    // //   duplicates.map(async (dups) => {
    // //     await Review.findByIdAndDelete(dups.reviews.toString());
    // //   })
    // // );
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data: ", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
