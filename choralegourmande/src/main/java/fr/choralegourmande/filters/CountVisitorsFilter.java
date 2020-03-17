package fr.choralegourmande.filters;

import fr.choralegourmande.entities.Visitor;
import fr.choralegourmande.mvc.CssController;
import fr.choralegourmande.repositories.VisitorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Created by romain on 27/02/2017.
 */
@Component
public class CountVisitorsFilter implements Filter {

    private static Logger LOG = LoggerFactory.getLogger(CountVisitorsFilter.class);

    VisitorRepository visitorRepo;

    public CountVisitorsFilter(VisitorRepository visitorRepo) {
        this.visitorRepo = visitorRepo;
    }


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        try {

            Date now = new Date(System.currentTimeMillis());
            SimpleDateFormat spd = new SimpleDateFormat("ddMMyyyy");
            String strDayNow = spd.format(now);
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            String host =httpRequest.getHeader("X-Forwarded-For");
            Date dayNow = spd.parse(strDayNow);
            Visitor v = visitorRepo.findFirstByDateOfVisitAndReferer(dayNow, host);
            if (v == null) {
                v = new Visitor(host, dayNow);
                visitorRepo.save(v);
            }

        } catch (ParseException e) {
            LOG.error(e.getMessage(), e);
        }

        chain.doFilter(request,response);

    }

    @Override
    public void destroy() {

    }
}
