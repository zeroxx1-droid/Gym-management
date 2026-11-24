import { WorkoutPlan, DietPlan } from "@/types";

export const initialWorkoutPlans: WorkoutPlan[] = [
  {
    id: "workout-hypertrophy",
    title: "Black Hypertrophy Protocol",
    goal: "Hypertrophy",
    level: "Intermediate",
    durationWeeks: 8,
    daysPerWeek: 4,
    description: "Targeted push-pull-legs split engineered for maximum muscle mass, mechanical tension, and explosive power.",
    schedule: [
      {
        day: "Monday - Push Heavy",
        focus: "Chest, Shoulders & Triceps",
        exercises: [
          { name: "Barbell Incline Bench Press", sets: 4, reps: "8-10", restSeconds: 90, notes: "Warm up with 2 progressive sets" },
          { name: "Dumbbell Flat Bench Press", sets: 3, reps: "10-12", restSeconds: 60, notes: "Slow 3s eccentric" },
          { name: "Standing Overhead Dumbbell Press", sets: 4, reps: "8-10", restSeconds: 90, notes: "Lockout core" },
          { name: "Cable Lateral Raises", sets: 4, reps: "15", restSeconds: 45, notes: "Constant tension" },
          { name: "Rope Tricep Pushdown", sets: 3, reps: "12-15", restSeconds: 45, notes: "Superset with dips" },
        ],
      },
      {
        day: "Tuesday - Pull & Core",
        focus: "Back, Rear Delts & Biceps",
        exercises: [
          { name: "Barbell Deadlift", sets: 4, reps: "6", restSeconds: 120, notes: "Focus on hip hinge" },
          { name: "Wide-Grip Lat Pulldowns", sets: 4, reps: "10-12", restSeconds: 75, notes: "Squeeze lats at bottom" },
          { name: "Chest-Supported T-Bar Rows", sets: 3, reps: "10", restSeconds: 60, notes: "Drive with elbows" },
          { name: "Incline Dumbbell Bicep Curls", sets: 4, reps: "12", restSeconds: 60, notes: "Full supination" },
          { name: "Hanging Leg Raises", sets: 3, reps: "15-20", restSeconds: 45, notes: "No swinging" },
        ],
      },
      {
        day: "Thursday - Lower Body Power",
        focus: "Quads, Hamstrings & Calves",
        exercises: [
          { name: "Barbell Back Squats", sets: 4, reps: "8", restSeconds: 120, notes: "Below parallel depth" },
          { name: "Romanian Deadlift (RDL)", sets: 4, reps: "10", restSeconds: 90, notes: "Feel hamstring stretch" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10 each leg", restSeconds: 75, notes: "Dumbbells in each hand" },
          { name: "Leg Extension Machine", sets: 3, reps: "15", restSeconds: 45, notes: "Pause 1s at top" },
          { name: "Seated Calf Raises", sets: 4, reps: "20", restSeconds: 45, notes: "Full ankle dorsiflexion" },
        ],
      },
      {
        day: "Friday - Athletic Conditioning & Arms",
        focus: "High Intensity, Core & Arm Blitz",
        exercises: [
          { name: "Kettlebell Swings", sets: 4, reps: "20", restSeconds: 45, notes: "Explosive hips" },
          { name: "Battle Ropes Waves", sets: 5, reps: "30 sec", restSeconds: 30, notes: "Maximum cadence" },
          { name: "EZ-Bar Preacher Curls", sets: 3, reps: "10-12", restSeconds: 60, notes: "Controlled descent" },
          { name: "Overhead French Press", sets: 3, reps: "12", restSeconds: 60, notes: "Deep elbow stretch" },
        ],
      },
    ],
  },
  {
    id: "workout-strength",
    title: "Iron Core Powerlifting",
    goal: "Strength",
    level: "Advanced",
    durationWeeks: 12,
    daysPerWeek: 3,
    description: "Classic powerlifting focused on progressive overload in Squat, Bench, and Deadlift fundamentals.",
    schedule: [
      {
        day: "Day 1 - Squat Focus",
        focus: "Squat + Assistance",
        exercises: [
          { name: "Competition Low-Bar Squat", sets: 5, reps: "5", restSeconds: 180, notes: "80% 1RM" },
          { name: "Pause Squats", sets: 3, reps: "3", restSeconds: 120, notes: "2s pause in the hole" },
          { name: "Walking Lunges", sets: 3, reps: "12 per leg", restSeconds: 60 },
          { name: "Ab-Wheel Rollouts", sets: 4, reps: "12", restSeconds: 60 },
        ],
      },
      {
        day: "Day 2 - Bench Focus",
        focus: "Bench Press + Triceps",
        exercises: [
          { name: "Competition Flat Bench Press", sets: 5, reps: "5", restSeconds: 180, notes: "Touch and pause" },
          { name: "Close-Grip Bench Press", sets: 3, reps: "8", restSeconds: 90 },
          { name: "Barbell Pendlay Rows", sets: 4, reps: "8", restSeconds: 90 },
          { name: "Face Pulls", sets: 4, reps: "15", restSeconds: 45 },
        ],
      },
      {
        day: "Day 3 - Deadlift Focus",
        focus: "Conventional Deadlift + Posterior Chain",
        exercises: [
          { name: "Conventional Deadlift", sets: 4, reps: "3", restSeconds: 240, notes: "Reset every rep" },
          { name: "Deficit Deadlifts", sets: 3, reps: "5", restSeconds: 120, notes: "1-inch deficit plate" },
          { name: "Barbell Good Mornings", sets: 3, reps: "10", restSeconds: 90 },
          { name: "Farmer's Carries", sets: 4, reps: "50 meters", restSeconds: 90 },
        ],
      },
    ],
  },
  {
    id: "workout-fat-loss",
    title: "Electric Shred HIIT & Tone",
    goal: "Fat Loss",
    level: "Beginner",
    durationWeeks: 6,
    daysPerWeek: 4,
    description: "High energy metabolic conditioning designed to incinerate body fat while toning lean muscle.",
    schedule: [
      {
        day: "Monday - Total Body Blitz",
        focus: "Full Body Circuits",
        exercises: [
          { name: "Goblet Squats", sets: 4, reps: "15", restSeconds: 45 },
          { name: "Push-ups to Renegade Row", sets: 3, reps: "12", restSeconds: 45 },
          { name: "Dumbbell Thrusters", sets: 4, reps: "12", restSeconds: 60 },
          { name: "Rowing Machine Intervals", sets: 6, reps: "250m sprint", restSeconds: 45 },
        ],
      },
      {
        day: "Wednesday - Core & Cardio Accelerator",
        focus: "Abs, Mobility & Aerobic Zone",
        exercises: [
          { name: "Plank to Shoulder Taps", sets: 4, reps: "20", restSeconds: 30 },
          { name: "Mountain Climbers", sets: 4, reps: "40 sec", restSeconds: 30 },
          { name: "Assault Air Bike Sprints", sets: 8, reps: "20s on / 10s off", restSeconds: 10 },
          { name: "Russian Twists with Med Ball", sets: 3, reps: "30", restSeconds: 45 },
        ],
      },
    ],
  },
];

export const initialDietPlans: DietPlan[] = [
  {
    id: "diet-lean-mass",
    title: "Clean High-Protein Lean Mass (2,600 kcal)",
    targetGoal: "Lean Muscle Hypertrophy",
    caloriesTarget: 2600,
    proteinGrams: 195,
    carbsGrams: 280,
    fatsGrams: 75,
    waterLiters: 3.5,
    description: "Clean hyper-caloric nutrition dense in branched-chain amino acids, complex carbohydrates, and essential healthy fats.",
    meals: [
      {
        time: "08:00 AM",
        mealName: "Breakfast: Power Oats & Egg Whites",
        foods: ["80g Rolled Oats with cinnamon", "4 Egg Whites + 2 Whole Eggs", "1 Banana", "1 Scoop Whey Isolate", "Handful of Blueberries"],
        calories: 620,
        protein: 48,
      },
      {
        time: "12:30 PM",
        mealName: "Lunch: Flame-Grilled Chicken & Brown Rice",
        foods: ["200g Grilled Chicken Breast", "150g Cooked Brown Rice", "Steamed Broccoli & Asparagus", "1 tbsp Olive Oil dressing"],
        calories: 680,
        protein: 56,
      },
      {
        time: "04:30 PM",
        mealName: "Pre-Workout Fuel",
        foods: ["2 Slices Whole Grain Toast", "2 tbsp Natural Peanut Butter", "1 Green Apple", "Black Coffee / Pre-workout drink"],
        calories: 420,
        protein: 14,
      },
      {
        time: "07:30 PM",
        mealName: "Dinner: Salmon Fillet & Sweet Potato",
        foods: ["220g Wild Salmon Fillet", "200g Roasted Sweet Potato", "Baby Spinach Salad with balsamic drizzle"],
        calories: 650,
        protein: 52,
      },
      {
        time: "10:00 PM",
        mealName: "Night Recovery",
        foods: ["150g Low-fat Greek Yogurt", "15g Walnuts", "1 scoop Micellar Casein"],
        calories: 230,
        protein: 25,
      },
    ],
  },
  {
    id: "diet-cutting",
    title: "Keto Shred & Fat Stripper (1,900 kcal)",
    targetGoal: "Rapid Fat Loss & Definition",
    caloriesTarget: 1900,
    proteinGrams: 175,
    carbsGrams: 90,
    fatsGrams: 65,
    waterLiters: 4.0,
    description: "Thermogenic deficit plan tuned for maximum muscle preservation while shredding visceral body fat.",
    meals: [
      {
        time: "08:30 AM",
        mealName: "Breakfast: Scrambled Eggs & Avocado",
        foods: ["3 Whole Organic Eggs", "1/2 Hass Avocado", "Handful of Baby Spinach", "1 cup Green Tea"],
        calories: 420,
        protein: 26,
      },
      {
        time: "01:00 PM",
        mealName: "Lunch: Pan-seared Lean Sirloin & Zucchini",
        foods: ["180g Lean Sirloin Steak", "Sauteed Zucchini & Bell Peppers", "Small Quinoa Bowl (80g)"],
        calories: 550,
        protein: 48,
      },
      {
        time: "05:00 PM",
        mealName: "Post-Workout Shake",
        foods: ["1.5 Scoops Whey Isolate with cold water", "10 Almonds"],
        calories: 260,
        protein: 38,
      },
      {
        time: "08:00 PM",
        mealName: "Dinner: Lemon Herb Tilapia & Green Beans",
        foods: ["220g White Tilapia Fillet", "Steamed French Green Beans", "Mixed Greens with lemon vinaigrette"],
        calories: 440,
        protein: 50,
      },
    ],
  },
];
