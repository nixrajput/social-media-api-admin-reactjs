import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      keys={["users", "posts", "comments"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "accent" }}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      borderColor={{
        from: 'color',
        modifiers: [
          ['darker', .6],
          ['opacity', .5]
        ]
      }}
      colorBy="id"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      // fill={[
      //   {
      //     match: {
      //       id: 'users'
      //     },
      //     id: 'dots'
      //   },
      //   {
      //     match: {
      //       id: 'comments'
      //     },
      //     id: 'lines'
      //   }
      // ]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0, // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0, // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={true}
      label="formattedValue"
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        "from": "theme",
        "theme": "labels.text.fill"
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      role="application"
      tooltip={e => {
        return (
          <div
            style={{
              background: "#f0f0f0",
              color: "#333",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
            }}
          >
            <div style={{
              backgroundColor: e.color,
              width: "10px",
              height: "10px",
            }} />
            <div style={{ marginLeft: "8px" }}>{`${e.id} - `}</div>
            <div style={{ fontWeight: "bold", marginLeft: "4px" }}>{e.value}</div>
          </div>
        );
      }}
      barAriaLabel={function (e) {
        return e.id + " " + e.value;
      }}
    />
  );
};

export default BarChart;
