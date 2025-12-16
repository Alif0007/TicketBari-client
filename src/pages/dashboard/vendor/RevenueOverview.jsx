const RevenueOverview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 shadow">
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value">$12,500</div>
            </div>

            <div className="stat bg-base-100 shadow">
                <div className="stat-title">Tickets Sold</div>
                <div className="stat-value">320</div>
            </div>

            <div className="stat bg-base-100 shadow">
                <div className="stat-title">Tickets Added</div>
                <div className="stat-value">45</div>
            </div>
        </div>
    );
};

export default RevenueOverview;
