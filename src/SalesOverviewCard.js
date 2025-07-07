import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function SalesOverviewCard() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Store chart instance to be able to destroy later
        let chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Sales',
                    data: [25000, 27500, 26000, 28500, 30000, 32500, 31000, 33500, 35000, 37500, 39000, 40000],
                    backgroundColor: 'rgba(78, 115, 223, 0.05)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function (value) {
                                return '₹' + value.toLocaleString();
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });

        // Cleanup function to destroy previous chart instance
        return () => {
            chartInstance.destroy();
        };
    }, []);


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Sales Overview</h6>
                            <div className="dropdown no-arrow">
                                <a
                                    className="dropdown-toggle"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink3"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots-vertical text-gray-400"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow animated--fade-in" aria-labelledby="dropdownMenuLink3">
                                    <li><h6 className="dropdown-header">Time Range:</h6></li>
                                    <li><a className="dropdown-item" href="#">Last 7 Days</a></li>
                                    <li><a className="dropdown-item" href="#">Last 30 Days</a></li>
                                    <li><a className="dropdown-item" href="#">Last 3 Months</a></li>
                                    <li><a className="dropdown-item" href="#">Last Year</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <canvas ref={chartRef} style={{ maxHeight: "300px" }}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

