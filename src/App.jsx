import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { program } from './data';
import { Fragment, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Container } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [week, setWeek] = useState('');
  const [day, setDay] = useState('');
  const [plan, setPlan] = useState(null);
  const [exercises, setExercises] = useState(null);

  const handleWeekChange = (e) => {
    const value = e.target.value.toString();
    if (week !== value) {
      setWeek(value);
      const plan = program.find(p => p.week === +value);
      setDay('');
      setExercises(null);
      setPlan(plan);
    }
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    if (day !== value) {
      setDay(day);
      const exercises = plan.days.find(d => d.day === value);
      setExercises(exercises);
    }
  };

  const getExerciseName = (name) => {
    switch (name) {
      case "squat":
        return "Squat";
      case "bench_press":
        return "Bench Press";
      case "barbell_row":
        return "Barbell Row";
      case "oh_press":
        return "Overhead Press";
      case 'deadlift':
        return "deadlift";
      default:
        throw Error(`Unknown name: $name`);
    }
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ padding: '24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ flex: '1' }}>
            <InputLabel id="week-label">Week</InputLabel>
            <Select labelId='week-label' label='week' displayEmpty value={week} onChange={handleWeekChange}>
              <MenuItem disabled value=''>Week</MenuItem>
              {program.map(p => (
                <MenuItem key={p.week} value={p.week}>{`Week ${p.week}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {plan && (
            <FormControl sx={{ flex: '1' }}>
              <InputLabel id="day-label">Day</InputLabel>
              <Select labelId='day-label' label='day' displayEmpty value={day} onChange={handleDayChange}>
                <MenuItem disabled value=''>Day</MenuItem>
                {plan.days.map(d => (
                  <MenuItem key={d.day} value={d.day}>{d.day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        {exercises && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px', padding: '0 8px', textTransform: 'uppercase', flexDirection: 'column' }}>
            <h3>Plan: {exercises.plan}</h3>
            {exercises.exercises.map(e => (
              <Fragment key={e.exercise}>
                <h1>{getExerciseName(e.exercise)}</h1>
                <h2>Reps: {e.reps}, Weight: {e.weight}</h2>
              </Fragment>
            ))}
          </Box>
        )}
      </Container>
    </ThemeProvider >
  );
}

export default App;
