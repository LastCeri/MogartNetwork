import React, { ChangeEvent, useState, useEffect } from 'react';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faSearch, faAdjust, faGear } from '@fortawesome/free-solid-svg-icons';
import StickyNotesModal from './components/StickyNotes/StickyNotesModal';

const VoiceCallSidebar: React.FC = () => {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const { isLoading,voiceDetectionLevel, setVoiceDetectionLevel, notes, setNotes } = useData();
    const [volumeLevel, setVolumeLevel] = useState(50);
    const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
    const [notes2, setNotes2] = useState<string[]>([]);


    useEffect(() => {
      if (isLoading) return;
        if (typeof notes === 'string') {
            try {
                const parsedNotes = JSON.parse(notes);
                if (Array.isArray(parsedNotes)) {
                    setNotes2(parsedNotes);
                }
            } catch (error) {
                console.error('Failed to parse notes from storage:', error);
            }
        }
    }, [notes]);

    const toggleSettings = () => setIsSettingsVisible(!isSettingsVisible);
    const toggleNoteModal = () => setIsNoteModalVisible(!isNoteModalVisible);

    const handleAddNoteLocal = (newNote: string) => {
        setNotes2(prevNotes => {
            const updatedNotes = [...prevNotes, newNote];
            setNotes(updatedNotes);  // Assuming setNotes accepts an array directly
            return updatedNotes;
        });
    };

    const handleDeleteNoteLocal = (index: number) => {
        setNotes2(prevNotes => {
            const updatedNotes = prevNotes.filter((_, noteIndex) => noteIndex !== index);
            setNotes(updatedNotes);  // Assuming setNotes accepts an array directly
            return updatedNotes;
        });
    };

    const handleDetectionLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVoiceDetectionLevel(Number(e.target.value));
    };

    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVolumeLevel(parseInt(e.target.value, 10));
    };

    return (
        <>
            <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 p-4 bg-white bg-opacity-90 shadow-xl rounded-r-3xl flex flex-col items-center justify-start space-y-4">
              <button onClick={toggleNoteModal} className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-150 ease-in-out">
                <FontAwesomeIcon icon={faStickyNote} size="lg" />
              </button>
              <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 ease-in-out">
                <FontAwesomeIcon icon={faSearch} size="lg" />
              </button>
              <button className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-150 ease-in-out">
                <FontAwesomeIcon icon={faAdjust} size="lg" />
              </button>
              <button onClick={toggleSettings} className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-150 ease-in-out">
                <FontAwesomeIcon icon={faGear} size="lg" />
              </button>
            </div>
            {isSettingsVisible && (
                <div className="fixed left-20 top-1/2 transform -translate-y-1/2 z-50 p-4 bg-white bg-opacity-90 shadow-xl rounded-r-3xl flex flex-col items-center justify-start space-y-4">
                    <h3 className="text-lg font-semibold">Settings</h3>
                    <label htmlFor="detectionLevel" className="block mt-4">
                        Voice Sensivity:
                        <input
                            type="range"
                            id="detectionLevel"
                            name="detectionLevel"
                            min="5"
                            max="100"
                            value={voiceDetectionLevel}
                            onChange={handleDetectionLevelChange}
                            className="w-full"
                        />
                    </label>
                    <p>{voiceDetectionLevel}</p>
                    <label htmlFor="volumeLevel" className="block mt-4">
                        Volume Control:
                        <div className="flex items-center space-x-2">
                            <input
                                type="range"
                                id="volumeLevel"
                                name="volumeLevel"
                                min="0"
                                max="100"
                                value={volumeLevel}
                                onChange={handleVolumeChange}
                                className="w-full"
                            />
                        </div>
                    </label>
                    <p>{volumeLevel}</p>
                </div>
            )}
            <StickyNotesModal onSave={handleAddNoteLocal} onClose={toggleNoteModal} onDelete={handleDeleteNoteLocal} isVisible={isNoteModalVisible} notes={notes2} />
        </>
    );
};

export default VoiceCallSidebar;
