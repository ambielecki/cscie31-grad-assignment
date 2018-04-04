let age_calculator = {
    // Ages from Little League Baseball
    getLeagueAge : function (date) {
        if (date >= new Date(2013, 8, 1) && date <= new Date(2014, 7, 31)) {
            return 4;
        } else if (date >= new Date(2012, 8, 1)) {
            return 5
        } else if (date >= new Date(2011, 8, 1)) {
            return 6
        } else if (date >= new Date(2010, 8, 1)) {
            return 7
        } else if (date >= new Date(2009, 8, 1)) {
            return 8
        } else if (date >= new Date(2008, 8, 1)) {
            return 9
        } else if (date >= new Date(2007, 8, 1)) {
            return 10
        } else if (date >= new Date(2006, 8, 1)) {
            return 11
        } else if (date >= new Date(2005, 4, 1)) {
            return 12
        }

        return 'Outside Little League Age Range';
    }
};

module.exports = age_calculator;