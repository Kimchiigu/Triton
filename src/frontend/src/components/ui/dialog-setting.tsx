import { useState, useEffect } from 'react';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Input } from './input';
import { Label } from './label';
import { Switch } from './switch';

export default function DialogSetting() {
  const settingIcon =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/thzsec4d506ejnafwdhm';

  const min = 1;
  const max = 99;

  type InputField =
    | 'pomodoro'
    | 'shortBreak'
    | 'longBreak'
    | 'longBreakInterval';

  type Preferences = {
    pomodoro: string;
    shortBreak: string;
    longBreak: string;
    longBreakInterval: string;
    autoStartBreaks: boolean;
    autoStartPomodoros: boolean;
  };

  const [values, setValues] = useState<Preferences>({
    pomodoro: '',
    shortBreak: '',
    longBreak: '',
    longBreakInterval: '',
    autoStartBreaks: false,
    autoStartPomodoros: false,
  });

  // TODO LOAD USER DATA
  useEffect(() => {
    fetch('/public/temp_db/mockUserPreferences.json')
      .then((res) => res.json())
      .then((data) => setValues(data))
      .catch((error) => console.error('Error loading preferences:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (
      /^\d*$/.test(value) &&
      (id === 'pomodoro' ||
        id === 'shortBreak' ||
        id === 'longBreak' ||
        id === 'longBreakInterval')
    ) {
      setValues((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSwitchChange = (
    id: 'autoStartBreaks' | 'autoStartPomodoros',
    checked: boolean,
  ) => {
    setValues((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleBlurOrEnter = (id: InputField) => {
    let numericValue = Number(values[id]);

    if (isNaN(numericValue) || numericValue < min) {
      numericValue = min;
    } else if (numericValue > max) {
      numericValue = max;
    }

    setValues((prev) => ({
      ...prev,
      [id]: numericValue.toString(),
    }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: InputField,
  ) => {
    if (e.key === 'Enter') {
      handleBlurOrEnter(id);
    }
  };

  // TODO SAVE USER DATA
  const saveChanges = () => {
    localStorage.setItem('userPreferences', JSON.stringify(values));
    alert('Preferences saved!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-6 ml-6 mb-6 bg-green-600 hover:bg-green-700">
          <img src={settingIcon} alt="Settings Icon" className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-pixel text-3xl">Settings</DialogTitle>
          <DialogDescription className="font-pixel text-lg">
            Make changes to your pomodoro here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          {/* TIME SETTINGS */}
          <div>
            <Label className="text-xl font-pixel">Time</Label>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <Label className="text-md font-pixel">Pomodoro</Label>
                <Input
                  id="pomodoro"
                  type="number"
                  value={values.pomodoro}
                  onChange={handleChange}
                  onBlur={() => handleBlurOrEnter('pomodoro')}
                  onKeyDown={(e) => handleKeyDown(e, 'pomodoro')}
                  min={min}
                  max={max}
                  className="font-pixel w-full"
                />
              </div>

              <div className="flex flex-col gap-4 w-full">
                <Label className="text-md font-pixel">Short Break</Label>
                <Input
                  id="shortBreak"
                  type="number"
                  value={values.shortBreak}
                  onChange={handleChange}
                  onBlur={() => handleBlurOrEnter('shortBreak')}
                  onKeyDown={(e) => handleKeyDown(e, 'shortBreak')}
                  min={min}
                  max={max}
                  className="font-pixel w-full"
                />
              </div>

              <div className="flex flex-col gap-4 w-full">
                <Label className="text-md font-pixel">Long Break</Label>
                <Input
                  id="longBreak"
                  type="number"
                  value={values.longBreak}
                  onChange={handleChange}
                  onBlur={() => handleBlurOrEnter('longBreak')}
                  onKeyDown={(e) => handleKeyDown(e, 'longBreak')}
                  min={min}
                  max={max}
                  className="font-pixel w-full"
                />
              </div>
            </div>
          </div>

          {/* SWITCHES */}
          <div className="flex flex-row items-center justify-between pr-8">
            <div className="flex flex-col gap-6">
              <Label htmlFor="autoStartBreaks" className="font-pixel">
                Auto Start Breaks
              </Label>
              <Label htmlFor="autoStartPomodoros" className="font-pixel">
                Auto Start Pomodoros
              </Label>
            </div>
            <div className="flex flex-col gap-6 items-center">
              <Switch
                id="autoStartBreaks"
                checked={values.autoStartBreaks}
                onCheckedChange={(checked) =>
                  handleSwitchChange('autoStartBreaks', checked)
                }
              />
              <Switch
                id="autoStartPomodoros"
                checked={values.autoStartPomodoros}
                onCheckedChange={(checked) =>
                  handleSwitchChange('autoStartPomodoros', checked)
                }
              />
            </div>
          </div>

          {/* LONG BREAK INTERVAL */}
          <div className="flex flex-col gap-4">
            <Label htmlFor="longBreakInterval" className="font-pixel">
              Long Break Interval
            </Label>
            <Input
              id="longBreakInterval"
              type="number"
              value={values.longBreakInterval}
              onChange={handleChange}
              onBlur={() => handleBlurOrEnter('longBreakInterval')}
              onKeyDown={(e) => handleKeyDown(e, 'longBreakInterval')}
              min={min}
              max={max}
              className="font-pixel w-1/3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={saveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
