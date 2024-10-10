const db = require('../../config/db');

// Get all Aggregators
exports.getAllAggregators = (callback) => {
    const query = 'SELECT * FROM Aggregator';
    db.query(query, callback);
};

// Get Aggregator by ID
exports.getAggregatorById = (id, callback) => {
    const query = 'SELECT * FROM Aggregator WHERE ID = ?';
    db.query(query, [id], callback);
};

// Create a new Aggregator
exports.createAggregator = (aggregator, callback) => {
    const query = `
        INSERT INTO Aggregator (AggregatorName, APIKey, SecretKey, EndpointURL, Status, CreatedBy, UpdatedBy)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const { AggregatorName, APIKey, SecretKey, EndpointURL, Status, CreatedBy, UpdatedBy } = aggregator;
    db.query(query, [AggregatorName, APIKey, SecretKey, EndpointURL, Status, CreatedBy, UpdatedBy], callback);
};

// Update Aggregator by ID
exports.updateAggregator = (id, aggregator, callback) => {
    const query = `
        UPDATE Aggregator
        SET AggregatorName = ?, APIKey = ?, SecretKey = ?, EndpointURL = ?, Status = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP
        WHERE ID = ?
    `;
    const { AggregatorName, APIKey, SecretKey, EndpointURL, Status, UpdatedBy } = aggregator;
    db.query(query, [AggregatorName, APIKey, SecretKey, EndpointURL, Status, UpdatedBy, id], callback);
};

// Delete Aggregator by ID
exports.deleteAggregator = (id, callback) => {
    const query = 'DELETE FROM Aggregator WHERE ID = ?';
    db.query(query, [id], callback);
};