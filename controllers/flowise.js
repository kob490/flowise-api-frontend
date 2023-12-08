export const createPrediction = async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    // Call the Flowise API endpoint here..
    const flowiseData = {
      question: message,
    };

    const response = await fetch(
      `${process.env.FLOWISE_URL}/api/v1/prediction/${process.env.FLOW_ID}`,
      {
        body: JSON.stringify(flowiseData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`,
        },
        method: "POST",
      }
    );

    const data = await response.json();
    console.log("data", data);

    res.status(200).json({ message: data.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
