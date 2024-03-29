import estimatedScheduleService from "../services/estimatedScheduleService";
const estimatedSchedule = async (req, res) => {
  try {
    const { scheduledAnimes } = await estimatedScheduleService();
  } catch (error) {
    console.error("error in getting the results", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
export default estimatedSchedule;
