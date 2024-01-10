import prismadb from "@/lib/prismadb";

const populateDatabase = async () => {
  console.log("Starting to populate the database...");

  // Define destinations
  const destinations = {
    'Asia': ['Tokyo', 'Bangkok', 'Singapore', 'Seoul', 'Hong Kong'],
    'Europe': ['Paris', 'Rome', 'Berlin', 'Madrid', 'Helsinki'],
    'North America': ['New York', 'Los Angeles', 'Toronto', 'Chicago', 'Mexico City']
  };

  console.log("Destinations defined.");

  // Define adjectives and types for hotel names
  const adjectives = ['Grand', 'Royal', 'Emerald', 'Silver', 'Golden', 'Azure', 'Scarlet', 'Majestic', 'Serene', 'Radiant'];
  const types = ['Plaza', 'Park', 'Resort', 'Retreat', 'Lodge', 'Inn', 'Villa', 'Estate', 'Palace', 'Oasis'];

  // Generate unique hotel names for each destination
  let hotelNames = [];
  for (const continent of Object.values(destinations)) {
    for (const city of continent) {
      for (const adj of adjectives) {
        for (const type of types) {
          hotelNames.push(`${city} ${adj} ${type}`);
        }
      }
    }
  }

  console.log(`Generated ${hotelNames.length} unique hotel names.`);

  // Shuffle the hotelNames array to randomize names across destinations
  hotelNames.sort(() => Math.random() - 0.5);

  // Counter to track the index of hotel names
  let hotelNameIndex = 0;

  // Iterate over each continent and its destinations
  for (const [continent, cities] of Object.entries(destinations)) {
    for (const city of cities) {
      console.log(`Creating destination: ${city}`);

      // Create the destination
      const destination = await prismadb.destination.create({
        data: {
          name: city,
          continent: continent,
        },
      });

      console.log(`Created destination: ${city}, ID: ${destination.id}`);

      // Create 3 hotels for each destination with unique names
      for (let i = 0; i < 3; i++) {
        console.log(`Creating hotel: ${hotelNames[hotelNameIndex]} in ${city}`);

        await prismadb.hotel.create({
          data: {
            name: hotelNames[hotelNameIndex++],
            destinationId: destination.id,
          },
        });

        console.log(`Created hotel: ${hotelNames[hotelNameIndex - 1]}`);
      }
    }
  }

  console.log("Database population completed.");
};

export default populateDatabase;
