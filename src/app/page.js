'use client';

import { useState, useEffect } from 'react';
import CalorieInfo from './CalorieInfo';

// The main component for the entire page.
export default function Page() {
  // --- STATE MANAGEMENT FOR CALORIE CALCULATOR ---
  // State variables for the calorie calculator inputs
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [weight, setWeight] = useState(165); // Weight in pounds
  const [activity, setActivity] = useState('moderate');
  const [calorieResult, setCalorieResult] = useState(null);

  // --- STATE MANAGEMENT FOR FOOD ENERGY CONVERTER ---
  // State variables for the food energy converter
  const [converterValue, setConverterValue] = useState(1);
  const [converterResult, setConverterResult] = useState(4.184);
  const [fromUnit, setFromUnit] = useState('kcal');
  const [toUnit, setToUnit] = useState('kJ');

  // --- LOGIC FOR CALORIE CALCULATOR ---
  // A lookup object to store the activity level multipliers for the TDEE calculation.
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  /**
   * Calculates the estimated daily calorie needs using the Mifflin-St Jeor formula.
   */
  const handleCalculate = () => {
    // Convert height to cm and weight to kg for the formula's metric units.
    const totalHeightInches = parseInt(heightFt) * 12 + parseInt(heightIn);
    const heightCm = totalHeightInches * 2.54;
    const weightKg = weight * 0.453592;

    let bmr;
    if (gender === 'male') {
      // Mifflin-St Jeor equation for men
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      // Mifflin-St Jeor equation for women
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activityMultipliers[activity];
    setCalorieResult(Math.round(tdee));
  };

  /**
   * Resets all the calorie calculator form fields to their initial state.
   */
  const handleClearCalorie = () => {
    setAge(25);
    setGender('male');
    setHeightFt(5);
    setHeightIn(10);
    setWeight(165);
    setActivity('moderate');
    setCalorieResult(null);
  };

  // --- LOGIC FOR FOOD ENERGY CONVERTER ---
  /**
   * This effect runs whenever the converter value or units change.
   * It performs the conversion and updates the result state.
   */
  useEffect(() => {
    let convertedValue;
    if (fromUnit === 'kcal' && toUnit === 'kJ') {
      convertedValue = converterValue * 4.184;
    } else if (fromUnit === 'kJ' && toUnit === 'kcal') {
      convertedValue = converterValue / 4.184;
    } else {
      convertedValue = converterValue; // If units are the same, no conversion is needed.
    }
    setConverterResult(convertedValue.toFixed(4));
  }, [converterValue, fromUnit, toUnit]);

  /**
   * Resets the food energy converter fields to their initial state.
   */
  const handleClearConverter = () => {
    setConverterValue(1);
    setFromUnit('kcal');
    setToUnit('kJ');
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      {/* Dynamic script and meta tags to enable Tailwind and Inter font */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header/Navigation with a new, clean style */}
        <header className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <nav className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-green-700 mb-4 sm:mb-0">
              <a href="/" className="hover:text-green-900 transition-colors">WellnessZ</a>
            </h1>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="font-semibold text-gray-600 hover:text-green-500 transition-colors">FINANCIAL</a>
              <a href="#" className="font-semibold text-green-500 hover:text-green-700 transition-colors">FITNESS & HEALTH</a>
              <a href="#" className="font-semibold text-gray-600 hover:text-green-500 transition-colors">MATH</a>
              <a href="#" className="font-semibold text-gray-600 hover:text-green-500 transition-colors">OTHER</a>
            </div>
          </nav>
        </header>

        {/* Main Content Area with two columns on large screens */}
        <main className="flex flex-col lg:flex-row gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:w-3/4">
            {/* Calorie Calculator Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-700 mb-4">Calorie Calculator</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day.
                This calculator can also provide some simple guidelines for gaining or losing weight.
              </p>

              {/* Calorie Calculator Form */}
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  {/* Gender Radio Buttons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="male"
                          checked={gender === 'male'}
                          onChange={(e) => setGender(e.target.value)}
                          className="form-radio text-green-500"
                        />
                        <span className="ml-2">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="female"
                          checked={gender === 'female'}
                          onChange={(e) => setGender(e.target.value)}
                          className="form-radio text-pink-500"
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                  </div>

                  {/* Height Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        className="w-1/2 rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <span className="self-center">ft</span>
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        className="w-1/2 rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <span className="self-center">in</span>
                    </div>
                  </div>

                  {/* Weight Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-1/2 rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <span className="self-center">pounds</span>
                    </div>
                  </div>

                  {/* Activity Dropdown */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="sedentary">Sedentary: little or no exercise</option>
                      <option value="light">Light: exercise 1-3 times/week</option>
                      <option value="moderate">Moderate: exercise 4-5 times/week</option>
                      <option value="active">Active: daily exercise or intense exercise 3-4 times/week</option>
                      <option value="veryActive">Very Active: intense exercise 6-7 times/week</option>
                    </select>
                  </div>
                </div>

                {/* Calculator Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-700 transition-colors"
                  >
                    Calculate
                  </button>
                  <button
                    onClick={handleClearCalorie}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                {/* Calculation Result */}
                {calorieResult && (
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                    <h3 className="font-bold text-lg text-green-700">Estimated Daily Calorie Needs:</h3>
                    <p className="mt-2 text-2xl font-extrabold text-green-900">{calorieResult} calories/day</p>
                  </div>
                )}
              </div>
            </div>

            {/* Food Energy Converter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Food Energy Converter</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The following converter can be used to convert between Calories and other common food energy units.
              </p>

              {/* Converter Form */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                  type="number"
                  value={converterValue}
                  onChange={(e) => setConverterValue(e.target.value)}
                  className="w-full md:w-1/4 rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full md:w-1/4 rounded-md border border-gray-300 p-2"
                >
                  <option value="kcal">Calorie [Nutritional, kcal]</option>
                  <option value="kJ">Kilojoules [kJ]</option>
                </select>
                <span className="text-2xl font-bold text-gray-500">=</span>
                <input
                  type="text"
                  value={converterResult}
                  readOnly
                  className="w-full md:w-1/4 bg-gray-100 rounded-md border border-gray-300 p-2"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full md:w-1/4 rounded-md border border-gray-300 p-2"
                >
                  <option value="kJ">Kilojoules [kJ]</option>
                  <option value="kcal">Calorie [Nutritional, kcal]</option>
                </select>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleClearConverter}
                  className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Render the new CalorieInfo component here */}
            <CalorieInfo />
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Updated Search Bar to be more responsive */}
              <div className="flex mb-6 w-full items-stretch rounded-full overflow-hidden border border-gray-300">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 p-2 outline-none focus:ring-green-500 focus:border-green-500"
                />
                <button className="bg-green-600 text-white px-4 text-sm font-bold hover:bg-green-700 transition-colors">
                  Search
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fitness and Health Calculators</h3>
              <ul className="space-y-2">
                <li><a href="#" className="block text-green-600 hover:underline">BMI</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Calorie</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Body Fat</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">BMR</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Macro</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Ideal Weight</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Pregnancy</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Pregnancy Weight Gain</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Pregnancy Conception</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Due Date</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">Pace</a></li>
                <li><a href="#" className="block text-green-600 hover:underline">More Fitness and Health Calculators</a></li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
