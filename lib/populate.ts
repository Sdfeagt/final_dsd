import prismadb from "@/lib/prismadb";

const populateDatabase = async () => {
  console.log("Starting to populate the database...");

  // Define destinations
  const destinations = {
    'Asia': ['Tokyo', 'Bangkok', 'Singapore', 'Seoul', 'Hong Kong'],
    'Europe': ['Paris', 'Rome', 'Berlin', 'Madrid', 'Helsinki'],
    'North America': ['New York', 'Los Angeles', 'Toronto', 'Chicago', 'Mexico City']
  };

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
    }
  }
  console.log("Database population completed.");
};

export default populateDatabase;
