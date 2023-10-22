import React, { useState } from "react";

const PageOne = () => {
  return (
    <div className="text-[#fafafa] w-full flex flex-col items-center py-4">
      <p className="text-2xl sm:text-3xl text-[#f5c9ff] font-bold">
      Depositing Stablecoins
      </p>
      <p className="w-10/12 sm:w-5/12 text-sm sm:text-base text-center py-3 leading-relaxed italic">
      Users can deposit their stablecoins into the platform. Once deposited, these funds start accruing interest over time based on the platform's borrowing activity. The dynamic interest rate system ensures that depositors receive returns that are proportional to the platform's utilization, offering a passive income source. Moreover, the deposited funds also act as the liquidity pool from which other users can borrow.
      </p>
    </div>
  );
};
const PageTwo = () => {
  return (
    <div className="text[#fafafa] w-full flex flex-col items-center py-4">
      <p className="text-2xl sm:text-3xl text-[#f5c9ff] font-bold">
        Borrowing Funds with Collateral
      </p>
      <p className="w-10/12 sm:w-5/12 text-sm sm:text-base text-center py-3 leading-relaxed italic">
      Users can request to borrow stablecoins by staking a collateral, typically in another cryptocurrency. The collateral ensures that loans are backed by tangible assets, providing security to the lenders. The borrowing interest rate is dynamically calculated based on the platform's overall lending activity, ensuring fairness for borrowers while keeping borrowing costs transparent.
      </p>
    </div>
  );
};
const PageThree = () => {
  return (
    <div className="text-[#fafafa] w-full flex flex-col items-center py-4">
      <p className="text-2xl sm:text-3xl text-[#f5c9ff] font-bold">
      Liquidation Mechanism
      </p>
      <p className="w-10/12 sm:w-5/12 text-sm sm:text-base text-center py-3 leading-relaxed italic">
      To further protect the lenders, the platform has a liquidation process in place. If a borrower's collateral value drops below a certain threshold due to market fluctuations, it can be liquidated to repay the borrowed amount. This ensures that lenders always have a degree of protection against potential defaults. Liquidators, users who facilitate this process, receive an incentive in the form of a liquidation bonus, ensuring the platform's health is regularly monitored and maintained.
      </p>
    </div>
  );
};
const PageFour = () => {
  return (
    <div className="text-[#fafafa] w-full flex flex-col items-center py-4">
      <p className="text-2xl sm:text-3xl text-[#f5c9ff] font-bold">
      Administrative Adjustments
      </p>
      <p className="w-10/12 sm:w-5/12 text-sm sm:text-base text-center py-3 leading-relaxed italic">
      The contract owner, or the platform administrator, possesses unique capabilities to tweak specific parameters of the platform. This includes adjusting collateral requirements, setting base and maximum borrowing rates, and modifying the liquidation bonus. Such adjustments are necessary to respond to changing market dynamics, ensuring the platform remains balanced, solvent, and attractive for both depositors and borrowers.
      </p>
    </div>
  );
};

const StepProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <div className="relative mt-6 mx-5">
        <div className="flex justify-around">
          <div
            className={`z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep == 1
                ? "bg-[#0090ff] text-white"
                : "bg-[#fafafa] text-gray-800"
            }`}
            onClick={() => setCurrentStep(1)}
          >
            1
          </div>
          <div
            className={`z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep == 2
                ? "bg-[#0090ff] text-white"
                : "bg-[#fafafa] text-gray-800"
            }`}
            onClick={() => setCurrentStep(2)}
          >
            2
          </div>
          <div
            className={`z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep === 3
                ? "bg-[#0090ff] text-white"
                : "bg-[#fafafa] text-gray-800"
            }`}
            onClick={() => setCurrentStep(3)}
          >
            3
          </div>
          <div
            className={`z-10 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep === 4
                ? "bg-[#0090ff] text-white"
                : "bg-[#fafafa] text-gray-800"
            }`}
            onClick={() => setCurrentStep(4)}
          >
            4
          </div>
        </div>
        <div className="absolute top-5 sm:top-6 left-0 right-0 h-0.5 bg-[#fafafa]"></div>
      </div>

      {currentStep == 1 && <PageOne />}
      {currentStep == 2 && <PageTwo />}
      {currentStep == 3 && <PageThree />}
      {currentStep == 4 && <PageFour />}
    </div>
  );
};

export default StepProgressBar;
