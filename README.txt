# Mistora

Mistora is a React-based dashboard for an ESP32-powered ultraponics or fogponics tower. The project is designed for a misting-based plant system where crops grow in a vertical tower and receive nutrients through fine mist or fog instead of soil.

The dashboard acts as the control and monitoring interface for the tower. It is intended to show live sensor readings, describe the current crop and system condition, visualize environmental trends, and eventually send control commands back to the ESP32.

## Project Concept

Mistora is built around the idea of a professional greenhouse control station for a small-scale automated fog tower. The interface should feel clean, modern, and technical, while still matching the organic theme of plant growth and misting.

The system focuses on helping users understand the health of the growing environment, not just displaying raw numbers. The dashboard should answer questions like:

- Is the tower currently operating normally?
- Are the plants receiving enough mist?
- Are the temperature, humidity, and nutrient levels within target range?
- Is the crop environment improving or getting worse over time?
- What actions or adjustments may be needed?

## Target Hardware

The planned hardware controller is an ESP32. It will collect readings from the tower and send them to the web dashboard through a real-time data layer.

Planned sensors:

- Temperature sensor
- Humidity sensor
- EC sensor for nutrient concentration

Possible controlled components:

- Misting mechanism
- Auto/manual misting mode

## Dashboard Features

### Live Overview

The main dashboard should show the current operating condition of the fog tower.

Planned overview features:

- Project name and system identity: Mistora
- ESP32 online/offline status
- Last updated timestamp
- Current misting state
- Overall tower status such as `Optimal`, `Needs Attention`, or `Critical`
- Live temperature, humidity, and EC readings

### Sensor Cards

The dashboard includes dedicated metric cards for each core sensor.

Each card should show:

- Current reading
- Unit of measurement
- Ideal target range
- Visual progress indicator
- Status interpretation, such as within target, below target, or above target

Core metrics:

- Temperature in Celsius
- Humidity in percent
- EC in mS/cm

### Descriptive Analytics

Mistora should include descriptive analytics that summarize what is happening in the system.

Example analytics:

- Humidity stayed within the ideal range for a percentage of recent readings.
- Temperature reached its highest point at a specific time.
- EC is trending higher or lower compared to earlier readings.
- Misting activity occurred a certain number of times in the current time window.
- The system may recommend increasing misting frequency if humidity remains low.

The goal is to explain the data in plain language so the dashboard feels useful for monitoring and decision-making.

### Trend Charts

The dashboard should visualize historical sensor readings.

Planned charts:

- Temperature trend
- Humidity trend
- EC trend

Possible time filters:

- 1 hour
- 6 hours
- 24 hours
- 7 days

### Misting Control Panel

Mistora should include a control area for interacting with the fog tower.

Planned controls:

- Manual mist on/off
- Auto mode toggle
- Mister status

Planned schedule values:

- Misting ON duration
- Rest/OFF duration
- Automatic misting interval

### Alerts and Recommendations

The system should identify readings outside target ranges and provide simple recommendations.

Example alerts:

- Temperature is too high.
- Humidity is below the target range.
- EC level is too low, suggesting diluted nutrient solution.
- EC level is too high, suggesting concentrated nutrient solution.
- ESP32 is offline or has not sent data recently.

Example recommendations:

- Increase misting frequency.
- Improve airflow or ventilation.
- Check nutrient solution concentration.
- Inspect the mister or pump.
- Reconnect or restart the ESP32.

### Activity Logs

Mistora should keep a recent event history.

Possible log events:

- ESP32 connected
- ESP32 disconnected
- Sensor reading received
- Misting cycle started
- Misting cycle completed
- Humidity warning triggered
- EC reading stabilized
- Manual control activated


### Dashboard Design
- optimized for all screens (web, mobile, etc.)
- utilizes sidebar, topbar, and main content area
- use inter for typography
- color palette should revolve around sky blue
- supports light/dark mode