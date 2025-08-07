'use client';

import { useState, useEffect } from 'react';
import CalorieInfo from './CalorieInfo';

// The main component for the entire page.
export default function Page() {
  // --- STATE MANAGEMENT FOR CALORIE CALCULATOR ---
  const [unitSystem, setUnitSystem] = useState('us');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  // State variables for US units
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [weight, setWeight] = useState(165); // Weight in pounds
  // State variables for Metric units
  const [heightCm, setHeightCm] = useState(180);
  const [weightKg, setWeightKg] = useState(75);
  const [activity, setActivity] = useState('moderate');
  const [calorieResult, setCalorieResult] = useState(null);
  
  // --- NEW STATE FOR SETTINGS TAB ---
  const [showSettings, setShowSettings] = useState(false);
  const [resultUnit, setResultUnit] = useState('Calories');
  const [bmrFormula, setBmrFormula] = useState('Mifflin St Jeor');
  const [bodyFat, setBodyFat] = useState(20);

  // --- CONVERSION LOGIC FOR OTHER UNITS ---
  const conversionRates = {
    Length: {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Millimeter: 0.001,
      Micrometer: 0.000001,
    },
    Weight: {
      Kilogram: 1,
      Gram: 0.001,
      Milligram: 0.000001,
      Pound: 0.453592,
    },
    // More unit types like Temperature, Area, Volume can be added here.
  };

  // --- STATE MANAGEMENT FOR FOOD ENERGY CONVERTER ---
  const [converterValue, setConverterValue] = useState(1);
  const [converterResult, setConverterResult] = useState(4.184);
  const [fromUnit, setFromUnit] = useState('kcal');
  const [toUnit, setToUnit] = useState('kJ');

  // --- LOGIC FOR CALORIE CALCULATOR ---
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  /**
   * Calculates the estimated daily calorie needs using the selected BMR formula.
   */
  const handleCalculate = () => {
    let calculatedHeightCm;
    let calculatedWeightKg;

    if (unitSystem === 'us') {
      const totalHeightInches = parseInt(heightFt) * 12 + parseInt(heightIn);
      calculatedHeightCm = totalHeightInches * 2.54;
      calculatedWeightKg = weight * 0.453592;
    } else if (unitSystem === 'metric') {
      calculatedHeightCm = heightCm;
      calculatedWeightKg = weightKg;
    } else {
      setCalorieResult(null);
      return;
    }

    let bmr;
    if (bmrFormula === 'Mifflin St Jeor') {
      if (gender === 'male') {
        bmr = 10 * calculatedWeightKg + 6.25 * calculatedHeightCm - 5 * age + 5;
      } else {
        bmr = 10 * calculatedWeightKg + 6.25 * calculatedHeightCm - 5 * age - 161;
      }
    } else if (bmrFormula === 'Revised Harris-Benedict') {
      if (gender === 'male') {
        bmr = 13.397 * calculatedWeightKg + 4.799 * calculatedHeightCm - 5.677 * age + 88.362;
      } else {
        bmr = 9.247 * calculatedWeightKg + 3.098 * calculatedHeightCm - 4.330 * age + 447.593;
      }
    } else if (bmrFormula === 'Katch-McArdle') {
        const leanBodyMass = calculatedWeightKg * (1 - bodyFat / 100);
        bmr = 370 + (21.6 * leanBodyMass);
    }
    
    let tdee = bmr * activityMultipliers[activity];
    
    // Convert to Kilojoules if selected
    if (resultUnit === 'Kilojoules') {
      tdee = tdee * 4.184;
    }

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
    setHeightCm(180);
    setWeightKg(75);
    setActivity('moderate');
    setCalorieResult(null);
    setBmrFormula('Mifflin St Jeor');
    setResultUnit('Calories');
    setBodyFat(20);
    setShowSettings(false);
  };
  
  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // --- LOGIC FOR FOOD ENERGY CONVERTER ---
  useEffect(() => {
    let convertedValue;
    if (fromUnit === 'kcal' && toUnit === 'kJ') {
      convertedValue = converterValue * 4.184;
    } else if (fromUnit === 'kJ' && toUnit === 'kcal') {
      convertedValue = converterValue / 4.184;
    } else {
      convertedValue = converterValue;
    }
    setConverterResult(convertedValue.toFixed(4));
  }, [converterValue, fromUnit, toUnit]);

  const handleClearConverter = () => {
    setConverterValue(1);
    setFromUnit('kcal');
    setToUnit('kJ');
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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

        <main className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-700 mb-4">Calorie Calculator</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day.
                This calculator can also provide some simple guidelines for gaining or losing weight.
              </p>

              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex border-b border-gray-300 mb-6">
                  <button
                    className={`py-2 px-4 font-semibold text-sm transition-colors ${
                      unitSystem === 'us'
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setUnitSystem('us')}
                  >
                    US Units
                  </button>
                  <button
                    className={`py-2 px-4 font-semibold text-sm transition-colors ${
                      unitSystem === 'metric'
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setUnitSystem('metric')}
                  >
                    Metric Units
                  </button>
                  <button
                    className={`py-2 px-4 font-semibold text-sm transition-colors ${
                      unitSystem === 'other'
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setUnitSystem('other')}
                  >
                    Other Units
                  </button>
                </div>

                {unitSystem === 'other' ? (
                  <>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Use this converter to convert to the unit accepted by the calculator.
                    </div>
                    <div className="flex space-x-2 border-b border-gray-300 pb-2 mb-4">
                      <button 
                        className={`px-4 py-2 text-sm font-semibold rounded-md ${
                          converterType === 'Length' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => { setConverterType('Length'); setOtherFromUnit('Meter'); setOtherToUnit('Centimeter'); setOtherConverterValue(1) }}
                      >
                        Length
                      </button>
                      <button 
                        className={`px-4 py-2 text-sm font-semibold rounded-md ${
                          converterType === 'Weight' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => { setConverterType('Weight'); setOtherFromUnit('Kilogram'); setOtherToUnit('Gram'); setOtherConverterValue(1) }}
                      >
                        Weight
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
                        <input
                          type="number"
                          value={otherConverterValue}
                          onChange={(e) => setOtherConverterValue(e.target.value)}
                          className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <select
                          value={otherFromUnit}
                          onChange={(e) => setOtherFromUnit(e.target.value)}
                          className="w-full rounded-md border border-gray-300 p-2 mt-2"
                        >
                          {Object.keys(conversionRates[converterType]).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                        <input
                          type="text"
                          value={otherConvertedValue}
                          readOnly
                          className="w-full rounded-md border border-gray-300 p-2 bg-gray-100"
                        />
                        <select
                          value={otherToUnit}
                          onChange={(e) => setOtherToUnit(e.target.value)}
                          className="w-full rounded-md border border-gray-300 p-2 mt-2"
                        >
                          {Object.keys(conversionRates[converterType]).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                        {unitSystem === 'us' && (
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
                        )}
                        {unitSystem === 'metric' && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={heightCm}
                              onChange={(e) => setHeightCm(e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <span className="self-center">cm</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                        {unitSystem === 'us' && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <span className="self-center">pounds</span>
                          </div>
                        )}
                        {unitSystem === 'metric' && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={weightKg}
                              onChange={(e) => setWeightKg(e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <span className="self-center">kg</span>
                          </div>
                        )}
                      </div>
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
                    
                    <button onClick={handleToggleSettings} className="mt-4 flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                        + Settings
                    </button>
                    
                    {showSettings && (
                        <div className="mt-4 border border-gray-300 rounded-lg p-4 space-y-4">
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-gray-700">Results units:</h4>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="Calories"
                                            checked={resultUnit === 'Calories'}
                                            onChange={(e) => setResultUnit(e.target.value)}
                                            className="form-radio text-green-500"
                                        />
                                        <span className="ml-2">Calories</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="Kilojoules"
                                            checked={resultUnit === 'Kilojoules'}
                                            onChange={(e) => setResultUnit(e.target.value)}
                                            className="form-radio text-green-500"
                                        />
                                        <span className="ml-2">Kilojoules</span>
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-gray-700">BMR estimation formula:</h4>
                                <div className="space-y-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Mifflin St Jeor"
                                            checked={bmrFormula === 'Mifflin St Jeor'}
                                            onChange={(e) => setBmrFormula(e.target.value)}
                                            className="form-radio text-green-500"
                                        />
                                        <span className="ml-2">Mifflin St Jeor</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Revised Harris-Benedict"
                                            checked={bmrFormula === 'Revised Harris-Benedict'}
                                            onChange={(e) => setBmrFormula(e.target.value)}
                                            className="form-radio text-green-500"
                                        />
                                        <span className="ml-2">Revised Harris-Benedict</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Katch-McArdle"
                                            checked={bmrFormula === 'Katch-McArdle'}
                                            onChange={(e) => setBmrFormula(e.target.value)}
                                            className="form-radio text-green-500"
                                        />
                                        <span className="ml-2">Katch-McArdle</span>
                                    </label>
                                    {bmrFormula === 'Katch-McArdle' && (
                                        <div className="mt-2 flex items-center">
                                            <label className="text-sm text-gray-600">Body Fat: </label>
                                            <input
                                                type="number"
                                                value={bodyFat}
                                                onChange={(e) => setBodyFat(e.target.value)}
                                                className="w-20 ml-2 rounded-md border border-gray-300 p-1 text-sm focus:ring-green-500 focus:border-green-500"
                                            />
                                            <span className="ml-1">%</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

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
                  </>
                )}
                
                {calorieResult && (
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                    <h3 className="font-bold text-lg text-green-700">Estimated Daily Calorie Needs:</h3>
                    <p className="mt-2 text-2xl font-extrabold text-green-900">
                      {calorieResult} {resultUnit === 'Calories' ? 'calories' : 'kilojoules'}/day
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Food Energy Converter</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The following converter can be used to convert between Calories and other common food energy units.
              </p>

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

            <CalorieInfo />
          </div>

          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
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