import React from 'react';
import Modal from 'react-modal';
import CarbonCredit from './CarbonCredit'; // Import the CarbonCredit component

const CarbonCreditModal = ({ onClose }) => {
    return (
        <Modal isOpen={true} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2 className="text-2xl font-bold mb-4">Carbon Credits Details</h2>
            <CarbonCredit /> {/* Include the speedometer here */}
            <h3 className="mt-4 text-lg font-semibold">Suggestions:</h3>
            <ul className="list-disc ml-5">
                <li>Reduce energy consumption.</li>
                <li>Utilize renewable energy sources.</li>
                <li>Engage in carbon offset programs.</li>
            </ul>
            <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </Modal>
    );
};

export default CarbonCreditModal;
