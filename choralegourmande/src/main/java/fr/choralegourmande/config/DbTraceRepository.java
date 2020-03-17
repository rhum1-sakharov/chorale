package fr.choralegourmande.config;

import fr.choralegourmande.entities.Visitor;
import fr.choralegourmande.repositories.VisitorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.trace.Trace;
import org.springframework.boot.actuate.trace.TraceRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by romain on 26/02/2017.
 */

public class DbTraceRepository implements TraceRepository{

    private static final Logger LOG = LoggerFactory.getLogger(DbTraceRepository.class);

    @Autowired
    VisitorRepository visitorRepo;


    @Override
    public List<Trace> findAll() {
        return null;
    }

    @Override
    public void add(Map<String, Object> map) {

        try {

            String path = (String) map.get("path");

            //ajouter le visiteur 1 x / jour
            if (path.startsWith("/api/feeds/search/types")) {

                Map traceMap = (Map) map.get("headers");
                Map requestMap = (Map) traceMap.get("request");

                Date now = new Date(System.currentTimeMillis());
                SimpleDateFormat spd = new SimpleDateFormat("ddMMyyyy");
                String strDayNow = spd.format(now);
                String host = (String) requestMap.get("host");
                Date dayNow = spd.parse(strDayNow);
                Visitor v = visitorRepo.findFirstByDateOfVisitAndReferer(dayNow, host);
                if (v == null) {
                    v = new Visitor(host, dayNow);
                    visitorRepo.save(v);
                }
            }
        } catch (ParseException e) {
            LOG.error(e.getMessage(), e);
        }

    }
}
