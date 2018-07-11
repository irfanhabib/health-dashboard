package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/influxdata/influxdb/client/v2"
)

const (
	MyDB     = "healthdata"
	username = "admin"
	password = "changeme"
)

type DataRow struct {
	Start          time.Time `json:"start_time"`
	Finish         time.Time `json:"finish_time"`
	ActiveCalories float64   `json:"active_calories`
	BodyMassIndex  float64   `json:"bmi"`
	HeartRate      float64   `json:"heart_rate"`
	Steps          float64   `json:"steps"`
	TotalFat       float64   `json:"total_fat`
	Weight         float64   `json:"weight"`
}

func readCSVData() {

	csvFile, _ := os.Open("./data.csv")
	exportFile, _ := os.Create("./influxData.csv")
	w := bufio.NewWriter(exportFile)

	reader := csv.NewReader(bufio.NewReader(csvFile))
	// var dataPoints []DataRow
	for {
		line, error := reader.Read()
		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
		}

		calories, _ := strconv.ParseFloat(line[2], 10)
		bmi, _ := strconv.ParseFloat(line[3], 10)
		heartrate, _ := strconv.ParseFloat(line[4], 10)
		steps, _ := strconv.ParseFloat(line[5], 10)
		totalFat, _ := strconv.ParseFloat(line[6], 10)
		weight, _ := strconv.ParseFloat(line[7], 10)
		startTime := parseTime(line[0])
		finishTime := parseTime(line[1])
		dataRow := DataRow{
			Start:          startTime,
			Finish:         finishTime,
			ActiveCalories: calories,
			BodyMassIndex:  bmi,
			HeartRate:      heartrate,
			Steps:          steps,
			TotalFat:       totalFat,
			Weight:         weight,
		}
		row := ""
		fmt.Printf("Processing %s\n", dataRow.Finish.String())
		finishTimeString := strconv.FormatInt(dataRow.Finish.UnixNano(), 10)
		if finishTimeString == "-6795364578871345152" {
			continue
		}
		if dataRow.ActiveCalories != 0 {
			row = fmt.Sprintf("%s\nactive_calories value=%f %s", row, dataRow.ActiveCalories, finishTimeString)
		}
		if dataRow.BodyMassIndex != 0 {
			row = fmt.Sprintf("%s\nbody_mass_index value=%f %s", row, dataRow.BodyMassIndex, finishTimeString)
		}
		if dataRow.HeartRate != 0 {
			row = fmt.Sprintf("%s\nheart_rate value=%f %s", row, dataRow.HeartRate, finishTimeString)
		}
		if dataRow.Steps != 0 {
			row = fmt.Sprintf("%s\nsteps value=%f %s", row, dataRow.Steps, finishTimeString)
		}
		if dataRow.TotalFat != 0 {
			row = fmt.Sprintf("%s\ntotal_fat value=%f %s", row, dataRow.TotalFat, finishTimeString)
		}
		if dataRow.Weight != 0 {
			row = fmt.Sprintf("%s\nweight value=%f %s", row, (dataRow.Weight / 2.2), finishTimeString)
		}

		// if row != "" {
		// 	// row = fmt.Sprintf("%s\n", row)
		// }
		_, err := w.WriteString(row)
		if err != nil {
			fmt.Printf("Failed to write line %s\n", err)
		}
	}
	w.Flush()
	exportFile.Close()
}

func parseTime(timeString string) time.Time {
	//"01-Jan-2014 13:00"
	year, _ := strconv.Atoi(timeString[7:11])
	month := time.January
	switch mth := timeString[3:6]; mth {
	case "Jan":
		month = time.January
	case "Feb":
		month = time.February
	case "Mar":
		month = time.March
	case "Apr":
		month = time.April
	case "May":
		month = time.May
	case "Jun":
		month = time.June
	case "Jul":
		month = time.July
	case "Aug":
		month = time.August
	case "Sep":
		month = time.September
	case "Oct":
		month = time.October
	case "Nov":
		month = time.November
	case "Dec":
		month = time.December
	}
	day, _ := strconv.Atoi(timeString[0:2])
	hour, _ := strconv.Atoi(timeString[12:14])
	utc, _ := time.LoadLocation("UTC")
	return time.Date(year, month, day, hour, 0, 0, 0, utc)

}

func main() {

	readCSVData()
	// Create a new HTTPClient
	c, err := client.NewHTTPClient(client.HTTPConfig{
		Addr:     "http://localhost:8086",
		Username: username,
		Password: password,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer c.Close()

	// Create a new point batch
	bp, err := client.NewBatchPoints(client.BatchPointsConfig{
		Database:  MyDB,
		Precision: "s",
	})
	if err != nil {
		log.Fatal(err)
	}

	// Create a point and add to batch
	tags := map[string]string{"cpu": "cpu-total"}
	fields := map[string]interface{}{
		"idle":   10.1,
		"system": 53.3,
		"user":   46.6,
	}

	pt, err := client.NewPoint("cpu_usage", tags, fields, time.Now())
	if err != nil {
		log.Fatal(err)
	}
	bp.AddPoint(pt)

	// Write the batch
	if err := c.Write(bp); err != nil {
		log.Fatal(err)
	}

	// Close client resources
	if err := c.Close(); err != nil {
		log.Fatal(err)
	}
}
